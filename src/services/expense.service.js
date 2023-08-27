'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/expense.model');

async function getAll({
  userId,
  categories,
  from,
  to,
}) {
  const queryParameters = {};

  if (userId) {
    queryParameters.userId = userId;
  }

  if (categories) {
    queryParameters.category = categories;
  }

  if (from && to) {
    queryParameters.spentAt = {
      [Op.between]: [from, to],
    };
  }

  const expenses = await Expense.findAll({
    where: queryParameters,
  });

  return expenses;
}

function getExpenseById(id) {
  return Expense.findByPk(id);
}

function createExpense(expense) {
  return Expense.create(expense);
}

async function updateExpense(id, params) {
  await Expense.update(params, {
    where: { id },
  });

  return Expense.getExpenseById(id);
}

function removeExpense(id) {
  return Expense.destroy({
    where: { id },
  });
}

module.exports = {
  getAll,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
