'use strict';

const usersServise = require('../services/users.js');
const expensesServise = require('../services/expenses.js');

const getAll = (req, res) => {
  const query = req.query;

  const expenses = expensesServise.getAll(query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServise.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const expense = req.body;

  const foundUser = usersServise.getById(expense.userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServise.create(expense);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServise.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServise.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServise.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;

  const updatedExpense = expensesServise.update({
    expenseId,
    data,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
