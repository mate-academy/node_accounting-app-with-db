'use strict';

const {
  getAllExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../services/exprensesService');
const { getAllUsers } = require('../services/usersServer.js');

async function getAllExpensesAction(req, res) {
  const expenses = await getAllExpenses();

  res.json(expenses);
};

async function addExpenseAction(req, res) {
  const expense = req.body;
  const allowedKeys = [
    'title',
    'amount',
    'category',
    'note',
    'userId',
  ];
  const keysExpense = Object.keys(expense);

  const missingFields = keysExpense.every(key => allowedKeys.includes(key));
  const users = await getAllUsers();

  if (
    !users.length
    || !users.filter((el) => el.id === expense.userId).length
    || !missingFields) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await addExpense(expense);

  res.json(newExpense);
  res.status(201);
};

async function getExpenseAction(req, res) {
  const { id } = req.params;
  const expenses = await getAllExpenses();

  if (!expenses.filter((el) => el.id === id).length) {
    res.sendStatus(404);

    return;
  }

  const expense = await getExpense(id);

  res.json(expense);
};

async function deleteExpenseAction(req, res) {
  const { id } = req.params;
  const expenses = await getAllExpenses();

  if (!expenses.filter((el) => el.id === id).length) {
    res.sendStatus(404);

    return;
  }

  deleteExpense(id);

  res.sendStatus(204);
};

async function updateExpenseAction(req, res) {
  const { id } = req.params;
  const expense = req.body;
  const allowedKeys = [
    'title',
    'mount',
    'category',
    'note',
    'spentAt',
    'userId',
  ];
  const expenses = await getAllExpenses();
  const keysExpense = Object.keys(expense);

  const missingFields = keysExpense.every(key => allowedKeys.includes(key));

  if (!missingFields) {
    res.sendStatus(400);

    return;
  }

  if (!expenses.filter((el) => el.id === id).length) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
  res.send(updateExpense(id, expense));
}

module.exports = {
  getAllExpensesAction,
  addExpenseAction,
  getExpenseAction,
  deleteExpenseAction,
  updateExpenseAction,
};
