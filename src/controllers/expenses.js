'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAllByQuery = (req, res) => {
  const expenses = expensesService.getAllByQuery(req.query);

  res.send(expenses);
};

const getSingleExpense = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const requestedExpense = expensesService.getExpenseById(+expenseId);

  if (!requestedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(requestedExpense);
};

const addExpense = (req, res) => {
  const {
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  } = req.body;

  if (
    !title || !usersService.getUserById(+userId)
    || !spentAt || amount === undefined || !category
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense({
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const requestedExpense = expensesService.getExpenseById(+expenseId);

  if (!requestedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.updateExpense(+expenseId, req.body);

  res.send(requestedExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const requestedExpense = expensesService.getExpenseById(+expenseId);

  if (!requestedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(+expenseId);
  res.sendStatus(204);
};

module.exports = {
  getAllByQuery,
  getSingleExpense,
  addExpense,
  updateExpense,
  deleteExpense,
};
