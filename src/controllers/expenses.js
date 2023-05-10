'use strict';

const {
  getAllExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../services/exprensesService');
const { getAllUsers } = require('../services/userService');

async function getAllExpensesAction(req, res) {
  try {
    const expenses = await getAllExpenses();

    res.json(expenses);
  } catch (error) {
    res.sendStatus(500).send('Error message');
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
      !users.length || !users.filter((el) => el.id === expense.userId).length
    || !missingFields) {
      res.sendStatus(400).send('Error message');

      return;
    }

    const newExpense = await addExpense(expense);

    res.status(201);
    res.json(newExpense);
  } catch (error) {
    res.sendStatus(500).send('Error message');
  }
};

async function getExpenseAction(req, res) {
  const { id } = req.params;

  try {
    await getExpense(id);

    const expense = await getExpense(id);

    res.json(expense);
  } catch (error) {
    res.sendStatus(404).send(error.message);
  }
};

async function deleteExpenseAction(req, res) {
  const { id } = req.params;

  try {
    await getExpense(id);

    await deleteExpense(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404).send(error.message);
  }
};

async function updateExpenseAction(req, res) {
  const { id } = req.params;
  const expense = req.body;
  const allowedKeys = [
    'title',
    'amount',
    'category',
    'note',
    'spentAt',
    'userId',
  ];
  const keysExpense = Object.keys(expense);

  const missingFields = keysExpense.every(key => allowedKeys.includes(key));

  if (!missingFields) {
    res.sendStatus(400).send('Error message');

    return;
  }

  try {
    await getExpense(id);
    res.send(await updateExpense(id, expense));
  } catch (error) {
    res.sendStatus(404).send(error.message);
  }
};

module.exports = {
  getAllExpensesAction,
  addExpenseAction,
  getExpenseAction,
  deleteExpenseAction,
  updateExpenseAction,
};
