'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAll = async(req, res) => {
  const expenses = await expenseService.getExpenses(req.query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const expenseId = +req.params.expenseId;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    category,
  } = req.body;

  const findUser = await userService.getUserById(+userId);

  if (!findUser || !spentAt || !title || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.createExpense(req.body);

  res.status(201);
  res.send(newExpense);
};

const removeExpense = async(req, res) => {
  const expenseId = +req.params.expenseId;
  const foundExpense = await expenseService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.removeExpense(foundExpense.id);

  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const expenseId = +req.params.expenseId;

  if (expenseId < 0) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!req.body) {
    res.sendStatus(422);

    return;
  }

  const updatedExpense = await expenseService
    .updateExpense(expenseId, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  addExpense,
  removeExpense,
  updateExpense,
};
