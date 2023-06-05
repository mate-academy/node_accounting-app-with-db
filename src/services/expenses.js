'use strict';

const { Expense } = require('../models/expense');
const { Op } = require('sequelize');

const getAllExpenses = (filters) => {
  const { userId, categories, from, to } = filters;

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: [categories] };
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  return Expense.findAll();
}

const getOneExpense = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const createExpense = (body) => {
  return Expense.create(body);
};

const updateExpense = (expenseId, data) => {
  return Expense.update(data, {
    where: { id: expenseId },
  });
};

const removeExpense = (expenseId) => {
  return Expense.destroy({
    where: {
      id: expenseId,
    },
  });
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  removeExpense,
};
