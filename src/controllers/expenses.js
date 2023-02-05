'use strict';

const expensesServices = require('../services/expenses');
const usersServices = require('../services/users');

async function getAll(req, res) {
  const { userId, category, from, to } = req.query;

  const expenses = await expensesServices.getAll(userId, category, from, to);

  res.statusCode = 200;
  res.send(expenses.map(expensesServices.normalize));
}

async function addExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = await usersServices.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expenseData = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const newExpense = await expensesServices.addExpense(expenseData);

  res.statusCode = 201;
  res.send(expensesServices.normalize(newExpense));
}

async function getById(req, res) {
  const { expenseId } = req.params;

  const foundExpense = await expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expensesServices.normalize(foundExpense));
}

async function removeExpense(req, res) {
  const { expenseId } = req.params;

  const expenseToRemove = await expensesServices.getById(expenseId);

  if (!expenseToRemove) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.removeExpense(expenseId);
  res.sendStatus(204);
}

async function updateExpense(req, res) {
  const { expenseId } = req.params;
  const { title } = req.body;

  const expense = await expensesServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const dataToUpdate = { title };

  const updatedExpense = await expensesServices.updateExpense(
    expenseId,
    dataToUpdate
  );

  res.statusCode = 200;
  res.send(expensesServices.normalize(updatedExpense));
}

module.exports = {
  getAll,
  addExpense,
  getById,
  removeExpense,
  updateExpense,
};
