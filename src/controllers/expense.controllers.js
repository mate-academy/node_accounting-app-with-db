/* eslint-disable no-console */
'use strict';

const expenseService = require('../services/expense.services');
const userService = require('../services/user.services');

const getAllExp = async(req, res) => {
  const expenses = await expenseService.getAllExpenses(req);

  res.statusCode = 200;
  res.send(expenses);
};

const getOneExp = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
  }

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExp = async(req, res) => {
  const { userId, title, amount, spentAt } = req.body;

  if (!spentAt || !title || !amount) {
    res.sendStatus(400);

    return;
  }

  const currentUser = await userService.getUserById(userId);

  if (!currentUser) {
    res.sendStatus(400);

    return;
  }

  try {
    const newExpense = await expenseService.createExpense(req.body);

    res.statusCode = 201;
    res.send(newExpense);
  } catch (error) {
    res.sendStatus(404);
    console.log(error);
  }
};

const updateExp = async(req, res) => {
  const { id } = req.params;
  const expense = req.body;

  if (!expense) {
    res.sendStatus(400);

    return;
  }

  const updatedExp = await expenseService.updateExpense(id, expense);

  if (!updatedExp) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(updatedExp);
};

const removeExp = async(req, res) => {
  const { id } = req.params;

  const currentExp = await expenseService.getExpenseById(id);

  if (!currentExp) {
    res.sendStatus(404);

    return;
  }

  await expenseService.deleteExpense(id);
  res.sendStatus(204);
};

module.exports = {
  getAllExp,
  getOneExp,
  createExp,
  updateExp,
  removeExp,
};
