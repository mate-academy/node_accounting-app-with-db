'use strict';

const { Sequelize } = require('sequelize');
const { Expense } = require('../models/Expense');

async function getAllExpenses(userId, categories, from, to) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories && categories.length) {
    where.category = categories;
  }

  if (from) {
    where.date = where.date || {};
    where.date[Sequelize.Op.gte] = from;
  }

  if (to) {
    where.date = where.date || {};
    where.date[Sequelize.Op.lte] = to;
  }

  const filteredExpenses = await Expense.findAll({ where });

  return filteredExpenses;
}

async function getExpenseById(id) {
  const expense = await Expense.findByPk(id);

  return expense;
}

async function createExpense({
  name,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const newExpense = await Expense.create({
    name,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
}

async function updateExpense({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  await Expense.update({
    spentAt,
    title,
    amount,
    category,
    note,
  }, {
    where: {
      id,
    },
  });

  return getExpenseById(id);
}

async function removeExpense(id) {
  await Expense.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
