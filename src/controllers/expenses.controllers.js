/* eslint-disable no-console */
'use strict';

const expensesServices = require('../services/expenses.services');
const usersServices = require('../services/users.services');

const get = (req, res) => {
  const query = req.query;

  if (!query) {
    res.send(expensesServices.getAllExpenses());

    return;
  }

  const expense = expensesServices.getByQueryExpenses(query);

  res.send(expense);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesServices.getByIdExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isUserExist = await usersServices.getByIdUser(userId);
  const allValueExist = String(userId)
    && spentAt
    && title
    && String(amount)
    && category
    && isUserExist;

  if (!allValueExist) {
    res.sendStatus(400);
  }

  const expense = expensesServices.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const newValues = req.body;

  console.log(newValues);

  if (!newValues) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesServices.getByIdExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = expensesServices.updateExpense(id, newValues);

  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesServices.getByIdExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.deleteExpense(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
