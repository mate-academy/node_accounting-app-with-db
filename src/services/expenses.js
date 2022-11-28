'use strict';

const { Expense } = require('../models/Expense');

const getAllExpenses = () => {
  return Expense.findAll();
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const createExpense = (data) => {
  return Expense.create(data);
};

const removeExpense = (id) => {
  return Expense.destroy({
    where: { id },
  });
};

const updateExpense = (id, data) => {
  return Expense.update(data, {
    where: { id },
  });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
