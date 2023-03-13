'use strict';

const { getFilteredExpenses } = require('../utils/getFilteredExpenses');
const Expense = require('../models/expense');

const getAllExpenses = async(query) => {
  const expenses = await Expense.findAll();
  const preperedExpenses = getFilteredExpenses(expenses, query);

  return preperedExpenses;
};

const getExpenseById = (expenseId) => {
  return Expense.findByPk(expenseId);
};

const createExpense = (userId, spentAt, title, amount, category, note) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const removeExpense = (expenseId) => {
  return Expense.destroy({
    where: { id: expenseId },
  });
};

const updateExpense = (id, values) => {
  return Expense.update(values, {
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
