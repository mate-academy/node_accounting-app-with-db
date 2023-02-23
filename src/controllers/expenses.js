'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

async function getAllExpenses(req, res) {
  const { userId, category, from, to } = req.query;

  const searchParams = {
    userId,
    category,
    from,
    to,
  };

  if (!searchParams) {
    res.sendStatus(400);

    return;
  };

  const expenses = await expenseService.getAllExpenses(searchParams);

  res.send(expenses.map(expense => expenseService.normalize(expense)));
};

async function getExpenseById(req, res) {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  res.statusCode = 200;
  res.send(expenseService.normalize(foundExpense));
};

async function createExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isAllDataProvided = userId
    && spentAt
    && title
    && amount
    && category
    && note;

  const foundUser = await userService.getUserById(userId);

  if (!isAllDataProvided || !foundUser) {
    res.sendStatus(400);

    return;
  };

  const expenseData = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const newExpense = await expenseService.createExpense(expenseData);

  res.statusCode = 201;
  res.send(expenseService.normalize(newExpense));
};

async function removeExpense(req, res) {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  await expenseService.removeExpense(expenseId);

  res.sendStatus(204);
};

async function updateExpense(req, res) {
  const { expenseId } = req.params;
  const expenseData = req.body;

  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  expenseService.updateExpense(expenseId, expenseData);

  res.statusCode = 200;
  res.send(expenseService.normalize(foundExpense));
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
