'use strict';

const expensesServices = require('../services/expenses.service');
const usersServices = require('../services/users.service');

const get = async(req, res) => {
  const query = req.query;
  let expenses = [];

  if (!query) {
    expenses = await expensesServices.getAllExpenses();

    res.send(expenses
      .map(expense => expensesServices.normalize(expense)));

    return;
  }

  expenses = await expensesServices.getByQueryExpenses(query);

  res.send(expenses
    .map(expense => expensesServices.normalize(expense)));
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesServices.getByIdExpense(id);

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
  const allValueExist = userId
    && spentAt
    && title
    && String(amount)
    && category
    && isUserExist;

  if (!allValueExist) {
    res.sendStatus(400);
  }

  const expense = await expensesServices.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(expensesServices.normalize(expense));
};

const update = async(req, res) => {
  const { id } = req.params;
  const newValues = req.body;

  if (!newValues) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesServices.getByIdExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = await expensesServices.updateExpense(id, newValues);

  res.send(expensesServices.normalize(newExpense));
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesServices.getByIdExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.deleteExpense(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
