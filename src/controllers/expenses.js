'use strict';

const userService = require('../services/users');
const expenseService = require('../services/expenses');

const getAllExpenses = (req, res) => {
  const filterParams = req.query;
  const preperedExpenses = expenseService.getAllExpenses(filterParams);

  res.send(preperedExpenses);
};

const getOneExpense = (req, res) => {
  const expenseId = +req.params.expenseId;

  if (isNaN(expenseId)) {
    res.sendStatus(404);

    return;
  }

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isValidDataType = typeof userId === 'number'
    && typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string'
    && typeof note === 'string';

  const foundUser = userService.getUserById(userId);

  if (!isValidDataType || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService
    .createExpense(userId, spentAt, title, amount, category, note);

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const expenseId = +req.params.expenseId;

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const expenseId = +req.params.expenseId;

  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const values = req.body;

  expenseService.updateExpense(expenseId, values);
  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  addExpense,
  removeExpense,
  updateExpense,
};
