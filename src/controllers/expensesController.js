'use strict';

const { validateExpenseBody, filterExpenses } = require('../utils/helpers');
const { isUser } = require('./userController');

let idTracker = 1;

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getAllExpenses = (req, res) => {
  const filteredExpenses = filterExpenses(expenses, req.query);

  res.json(filteredExpenses);
};

const createNewExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!validateExpenseBody(req.body) || !isUser(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: idTracker,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  idTracker++;

  expenses.push(newExpense);
  res.status(201).json(newExpense);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenses.find(
    (expense) => expense.id === Number.parseInt(id)
  );

  if (!foundExpense) {
    res.sendStatus(404);
  } else {
    res.json(foundExpense);
  }
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === Number.parseInt(id)
  );

  if (expenseIndex < 0) {
    res.sendStatus(404);
  } else {
    expenses.splice(expenseIndex, 1);
    res.sendStatus(204);
  }
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === Number.parseInt(id)
  );

  const updatedExpense = {
    ...expenses[expenseIndex],
    ...req.body,
  };

  if (expenseIndex < 0) {
    res.sendStatus(404);
  } else {
    expenses.splice(expenseIndex, 1, updatedExpense);
    res.json(updatedExpense);
  }
};

module.exports = {
  getAllExpenses,
  createNewExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
