'use strict';

const { Op } = require('sequelize');
const Expenses = require('../models/Expense');

async function getAllExpenses(requestQuery) {
  const { userId, categories, from, to } = requestQuery;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: categories };
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  const expense = await Expenses.findAll({ where });

  return expense;
};

async function getExpenseById(expenseId) {
  const foundExpenses = await Expenses.findByPk(expenseId);

  return foundExpenses;
}

async function createExpense(requestBody) {
  const expense = await Expenses.create({ ...requestBody });

  return expense;
}

async function removeExpense(expenseId) {
  const expense = await Expenses.destroy({ where: { id: expenseId } });

  return expense;
}

async function updateExpense(expenseId, requestBody) {
  const expense = await Expenses.update(requestBody, {
    where: { id: expenseId },
  });

  return expense;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
