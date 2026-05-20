'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const { getUserById } = require('./users.service.js');

function parseId(raw) {
  const id = typeof raw === 'string' ? Number(raw) : raw;

  return Number.isInteger(id) && id >= 1 ? id : null;
}

function toExpenseDto(expense) {
  return {
    id: expense.id,
    spentAt: expense.spentAt,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    note: expense.note,
    userId: expense.userId,
  };
}

/**
 * @param {Record<string, unknown>} query
 * @returns {Promise<Array<{ id: number } & Record<string, unknown>> | null>}
 */
async function getExpenses(query) {
  const present = (key) => {
    const v = query[key];

    return v !== undefined && v !== null && v !== '';
  };

  const toMs = (raw) => {
    if (raw === undefined || raw === null || raw === '') {
      return null;
    }

    const ms = Date.parse(String(raw));

    return Number.isNaN(ms) ? null : ms;
  };

  if (present('userId')) {
    const user = await getUserById(query.userId);

    if (!user) {
      return null;
    }
  }

  const userId = present('userId') ? parseId(query.userId) : null;
  const fromMs = toMs(query.from);
  const toEndMs = toMs(query.to);

  const where = {};

  if (userId !== null) {
    where.userId = userId;
  }

  if (fromMs !== null || toEndMs !== null) {
    where.spentAt = {};

    if (fromMs !== null) {
      where.spentAt[Op.gte] = new Date(fromMs);
    }

    if (toEndMs !== null) {
      where.spentAt[Op.lte] = new Date(toEndMs);
    }
  }

  if (present('categories')) {
    const categories = String(query.categories)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (categories.length > 0) {
      where.category = { [Op.in]: categories };
    }
  }

  const expenses = await Expense.findAll({ where });

  return expenses.map(toExpenseDto);
}

async function getExpensesById(rawId) {
  const id = parseId(rawId);
  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  return toExpenseDto(expense);
}

async function creatEexpenses(payload) {
  const user = await getUserById(payload.userId);

  if (!user) {
    return null;
  }

  const expense = await Expense.create(payload);

  return toExpenseDto(expense);
}

async function updatEexpenses(rawId, payload) {
  const id = parseId(rawId);

  if (id === null) {
    return null;
  }

  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.update(payload);

  return toExpenseDto(expense);
}

/** @returns {Promise<boolean | null>} */
async function deletEexpenses(rawId) {
  const id = parseId(rawId);

  if (id === null) {
    return null;
  }

  const expense = await Expense.findByPk(id);

  if (!expense) {
    return null;
  }

  await expense.destroy();

  return true;
}

module.exports = {
  getExpenses,
  getExpensesById,
  creatEexpenses,
  updatEexpenses,
  deletEexpenses,
};
