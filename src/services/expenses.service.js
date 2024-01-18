'use strict';

const { Expense } = require('../models/expenses.model');

const getAllExpenses = () => {
  return Expense.findAll({
    order: ['title'],
  });
};

const getExpenseById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const createNewExpense = (newExpanse) => {
  return Expense.create({ ...newExpanse });
};

const removeExpense = (expenseId) => {
  return Expense.destroy({
    where: { expenseId },
  });
};

const updateExpense = (id, body) => {
  return Expense.update({ ...body }, {
    where: { id },
  });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createNewExpense,
  removeExpense,
  updateExpense,
};
