'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/ExpenseModel');

async function getAll() {
  return Expense.findAll({
    order: ['id'],
  });
}

async function getFilteredExpenses({ to, userId, from, categories }) {
  const where = {};

  if (to) {
    where.spentAt = {
      ...where.spentAt,
      [Op.lte]: to,
    };
  }

  if (from) {
    where.spentAt = {
      ...where.spentAt,
      [Op.gte]: from,
    };
  }

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: Array.isArray(categories)
        ? categories
        : [categories],
    };
  }

  return Expense.findAll({
    where,
    order: ['id'],
  });
}

async function getExpenseById(expenseId) {
  return Expense.findOne({
    where: {
      id: expenseId,
    },
  });
}

async function createExpense(data) {
  return Expense.create(data);
}

async function deleteExpense(id) {
  await Expense.destroy({
    where: {
      id,
    },
  });
}

async function updateExpense(data) {
  await Expense.update(data, {
    where: {
      id: data.id,
    },
  });

  return data;
}

module.exports = {
  getAll,
  getFilteredExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
  createExpense,
};
