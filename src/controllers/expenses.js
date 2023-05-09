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
  try {
    const expenses = await getAllExpenses();

    res.json(expenses);
  } catch (error) {
    res.sendStatus(500);
  }
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

  try {
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
  } catch (error) {
    res.sendStatus(500);
  }
};

async function getExpenseAction(req, res) {
  const { id } = req.params;

  try {
    await getExpense(id);

    const expense = await getExpense(id);

    res.json(expense);
  } catch (error) {
    res.sendStatus(404);
  }
};

async function deleteExpenseAction(req, res) {
  const { id } = req.params;

  try {
    await getExpense(id);

    deleteExpense(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
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
  const keysExpense = Object.keys(expense);

  const missingFields = keysExpense.every(key => allowedKeys.includes(key));

  if (!missingFields) {
    res.sendStatus(400);

    return;
  }

  try {
    await getExpense(id);
    res.sendStatus(200);
    res.send(updateExpense(id, expense));
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAllExpensesAction,
  addExpenseAction,
  getExpenseAction,
  deleteExpenseAction,
  updateExpenseAction,
};
