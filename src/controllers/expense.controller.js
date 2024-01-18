'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getExpenses = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expenseService.getAll(userId, categories, from, to);

  if (userId || categories || from || to) {
    if (!expenses.length) {
      res.sendStatus(404);

      return;
    }
  }
  res.send(expenses);
};

const getExpense = async(req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExpense = async(req, res) => {
  const expense = req.body;

  const user = await userService.getById(expense.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create(expense);

  res.status(201).send(newExpense);
};

const removeExpense = async(req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);

  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;
  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.update(id, updatedExpense);

  res.send(expense);
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
