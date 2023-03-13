'use strict';

const expenseService = require('../services/expenses');
const userServices = require('../services/users');

const getAll = (req, res) => {
  const filterParams = req.query;

  const expenses = expenseService.getAll();
  const filteredExpenses
    = expenseService.filterExpenses(expenses, filterParams);

  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;

  const expense = expenseService.getById(+expenseId);

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = userServices.getById(+userId);

  if ((typeof spentAt !== 'string')
    || (typeof title !== 'string')
    || (typeof amount !== 'number')
    || (typeof category !== 'string')
    || (note && typeof note !== 'string')
    || !user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.addExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  const expense = expenseService.getById(+expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if ((spentAt && typeof spentAt !== 'string')
    || (title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (category && typeof category !== 'string')
    || (note && typeof note !== 'string')) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expenseService.updateExpense(+expenseId, req.body);

  res.send(updatedExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const expense = expenseService.getById(+expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(+expenseId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  addExpense,
  updateExpense,
  deleteExpense,
};
