'use strict';

const expenseService = require('../services/expenses.service');

const get = (req, res) => {
  res.send(expenseService.getExpenses(req.body));
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const expense = req.body;

  if (!expense) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.addExpense(expense);

  res.sendStatus(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const newProperties = req.body;

  if (!id) {
    res.sendStatus(400);
  }

  if (!expenseService.getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService
    .updateExpense(id, newProperties);

  res.send(updatedExpense);
};

module.exports = {
  get, getOne, add, remove, update,
};
