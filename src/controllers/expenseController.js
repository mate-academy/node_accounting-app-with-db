'use strict';

const userServices = require('../services/userServices');
const expenseServices = require('../services/expenseServices');

async function getExpenses(req, res) {
  const { userId, categories, from, to } = req.query;
  const expenses = await expenseServices.getExpenses(
    userId, categories, from, to
  );

  res.send(expenses);
};

async function getExpenseById(req, res) {
  const { expenseId } = req.params;

  const foundExpense = await expenseServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

async function createExpense(req, res) {
  const { userId, title } = req.body;

  const foundUser = await userServices.getUserById(userId);

  if (!foundUser || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseServices.createExpense(req.body);

  res.status(201);
  res.send(newExpense);
};

async function deleteExpense(req, res) {
  const { expenseId } = req.params;
  const expense = expenseServices.getExpenseById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expenseServices.deleteExpense(expenseId);

  res.sendStatus(204);
};

async function updateExpense(req, res) {
  const { expenseId } = req.params;
  let expense = await expenseServices.getExpenseById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expense = await expenseServices.updateExpense(expense, req.body);

  res.send(expense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
