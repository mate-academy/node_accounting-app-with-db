'use strict';

const { expenses } = require('../models/expenses.js');

const getALl = () => expenses.getAll();

const getById = (expenseId) => expenses.getById(expenseId);

const create = (expenseData) => expenses.create(expenseData);

const remove = (expenseId) => expenses.remove(expenseId);

const update = (expense, newExpenseData) =>
  expenses.update(expense, newExpenseData);

module.exports = {
  resetAll: () => expenses.resetAll(),
  getALl,
  getById,
  create,
  remove,
  update,
};
