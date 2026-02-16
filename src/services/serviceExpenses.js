'use strict';

/* eslint-disable comma-dangle, prettier/prettier */

const { Expense } = require('../models/Expense.model');
const { Op } = require('sequelize');

const getAllExpenses = async (userId, categories, from, to) => {
  const where = {};

  if (userId) {
    where.userId = Number(userId);
  }

  if (categories) {
    const categoryList = Array.isArray(categories) ? categories : [categories];

    where.category = {
      [Op.in]: categoryList,
    };
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }
  }

  const expenses = await Expense.findAll({
    where,
  });

  return expenses;
};

const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const createExpense = async (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const expense = await Expense.create({
    userId: Number(userId),
    spentAt,
    title,
    amount: Number(amount),
    category,
    note: note || '',
  });

  return expense;
};

const updateExpense = async (id, updates) => {
  const expense = await getExpenseById(id);

  if (!expense) {
    return null;
  }

  const updateData = {};

  if (updates.spentAt !== undefined) {
    updateData.spentAt = updates.spentAt;
  }

  if (updates.title !== undefined) {
    updateData.title = updates.title;
  }

  if (updates.amount !== undefined) {
    updateData.amount = Number(updates.amount);
  }

  if (updates.category !== undefined) {
    updateData.category = updates.category;
  }

  if (updates.note !== undefined) {
    updateData.note = updates.note;
  }

  await expense.update(updateData);

  return expense;
};

const deleteExpense = async (id) => {
  const expense = await getExpenseById(id);

  if (!expense) {
    return false;
  }

  await expense.destroy();

  return true;
};

const clearExpenses = async () => {
  await Expense.destroy({
    where: {},
    truncate: true,
  });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  clearExpenses,
};
