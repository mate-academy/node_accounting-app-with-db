'use strict';

const expensesServices = require('../services/expenses.services.js');
const userServices = require('../services/users.services.js');

const getAll = (req, res) => {
  res.status(200).send(expensesServices.getAll(req.query));
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
    || !userServices.getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(expensesServices.createExpense(req.body));
};

const getCurrentExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const currentExpense = expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(currentExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const currentExpense = expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.removeExpense(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const currentExpense = expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesServices.updateExpense(expenseId, req.body);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAll,
  add,
  getCurrentExpense,
  remove,
  update,
};
