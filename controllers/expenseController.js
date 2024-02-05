'use strict';

const expensesService = require('../services/expenseService');
const { getUserById } = require('../services/userService');

const getAllExpenses = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  const filteredExpenses = await expensesService.getExpenses(
    userId, categories, from, to);

  res.statusCode = 200;
  res.send(filteredExpenses);
};

const getExpenseById = async(req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.statusCode = 404;
    res.send('Expenses not found');

    return;
  }
  res.statusCode = 200;
  res.send(expense);
};

const createExpense = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = await getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (isNaN(Date.parse(spentAt)) || !spentAt
  || typeof title !== 'string' || !title
  || typeof amount !== 'number' || !amount
  || (typeof category !== 'string' && category)
  ) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.createExpense(
    userId, spentAt, title, amount, category, note);

  res.statusCode = 201;
  res.send(expense);
};

const updateExpense = async(req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const foundExpense = await expensesService.getExpenseById(id);

  if (!foundExpense) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }

  if (
    (isNaN(Date.parse(spentAt)) && spentAt)
  || (typeof title !== 'string' && title)
  || (typeof amount !== 'number' && amount)
  || (typeof category !== 'string' && category)
  ) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await expensesService.updateExpense(
    id, spentAt, title, amount, category, note);

  if (!updatedExpense) {
    res.statusCode(400);
    res.send('Update failed');

    return;
  }

  res.statusCode = 200;
  res.send(updatedExpense);
};

const deleteExpense = async(req, res) => {
  const { id } = req.params;
  const result = await expensesService.deleteExpense(id);

  if (!result) {
    res.statusCode = 404;
    res.send('Expense not found');

    return;
  }
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
