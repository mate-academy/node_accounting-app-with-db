'use strict';

const expensesService = require('../services/expenses');

const getAllExpenses = async(req, res) => {
  const expenses = await expensesService.getAllExpenses();

  res.send(expenses);
};

const getExpenseById = async(req, res) => {
  const { expenseId } = req.params;

  const expense = await expensesService.getExpenseById(expenseId);

  res.send(expense);
};

const createExpense = async(req, res) => {
  const { userId, title, amount, category, note } = req.body;

  const newExpense = await expensesService.createExpense(
    userId,
    title,
    amount,
    category,
    note
  );

  res.send(newExpense);
};

const removeExpense = async(req, res) => {
  const { expenseId } = req.params;

  await expensesService.removeExpense(expenseId);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const { title, amount, category, note } = req.body;

  await expensesService.updateExpense(expenseId, title, amount, category, note);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
