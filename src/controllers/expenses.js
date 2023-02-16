'use strict';

const usersServices = require('../services/users');
const expensesServices = require('../services/expenses');

async function getAll(req, res) {
  const queryParams = req.query;

  const expenses = await expensesServices.getAll(queryParams);

  res.send(expenses.map(expensesServices.normalize));
}

async function getById(req, res) {
  const { expenseId } = req.params;
  const foundExpense = await expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesServices.normalize(foundExpense));
}

async function add(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;
  const foundUser = await usersServices.getById(userId);

  const isDataInvalid = !foundUser
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string';

  if (isDataInvalid) {
    res.sendStatus(400);

    return;
  }

  const expenseData = req.body;
  const newExpense = await expensesServices.create(expenseData);

  res.statusCode = 201;
  res.send(expensesServices.normalize(newExpense));
}

async function remove(req, res) {
  const { expenseId } = req.params;
  const foundExpense = await expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.remove(expenseId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { expenseId } = req.params;
  const foundExpense = await expensesServices.getById(expenseId);

  if (!foundExpense) {
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

  if (spentAt && typeof spentAt !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (title && typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (amount && typeof amount !== 'number') {
    res.sendStatus(400);

    return;
  }

  if (category && typeof category !== 'string') {
    res.sendStatus(400);

    return;
  }

  if (note && typeof note !== 'string') {
    res.sendStatus(400);

    return;
  }

  const expenseData = req.body;

  await expensesServices.update(expenseId, expenseData);

  const updatedExpense = await expensesServices.getById(expenseId);

  res.send(expensesServices.normalize(updatedExpense));
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
