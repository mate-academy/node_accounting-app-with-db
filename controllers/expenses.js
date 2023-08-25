/* eslint-disable object-curly-newline */
'use strict';

const expensessService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getAll = (req, res) => {
  const query = req.query;

  if (!query) {
    res.status(304).send('Not modified');
  }

  const expenses = expensessService.getAll(query);

  res.status(200).send(expenses);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.status(400).send('Bad request');
  }

  const foundedExpense = expensessService.getExpenseById(expenseId);

  if (foundedExpense) {
    res.status(200).send(foundedExpense);
  } else {
    res.status(404).send('Expense not found');
  }
};

const createEpxense = (req, res) => {
  const body = req.body;

  const expenseFields = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];

  const isFieldMissing = expenseFields.some(field => {
    return !(field in body) || !body[field].toString().length;
  });

  const foundedUser = usersService.getUserById(body.userId);

  if (isFieldMissing) {
    res.status(400).send('Some field is missing');
  }

  if (!foundedUser) {
    res.status(400).send('User not found');
  }

  const expense = expensessService.createEpxense(body);

  res.status(201).send(expense);
};

const updateExpense = (req, res) => {
  const expenseFields = [
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];
  const { expenseId } = req.params;
  const foundedExpence = expensessService.getExpenseById(expenseId);
  const body = req.body;
  const wrongFields = !Object.keys(body)
    .every(field => expenseFields.includes(field));

  if (wrongFields) {
    res.status(400).send('Bad request');
  }

  if (foundedExpence) {
    const updatedExpense = expensessService.updateExpense(expenseId, body);

    res.status(200).send(updatedExpense);
  } else {
    res.status(404).send('Expense not found');
  }
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpence = expensessService.getExpenseById(expenseId);

  if (foundedExpence) {
    expensessService.removeExpense(expenseId);
    res.status(204).send('OK');
  } else {
    res.status(404).send('Bad request');
  }
};

module.exports = {
  getAll,
  getExpense,
  createEpxense,
  removeExpense,
  updateExpense,
};
