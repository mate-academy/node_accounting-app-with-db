'use strict';

const express = require('express');
const router = express.Router();
const { users } = require('./users.js');

let expenses = [];

router.get('/', (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = expenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  if (userId && categories) {
    filteredExpenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  res.send(filteredExpenses);
});

router.get('/:expenseId', (req, res) => {
  const { expenseId } = req.params;

  const findExpense = expenses.find(expense => expense.id === +expenseId);

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(findExpense);
});

router.post('/', (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const findUser = users.find(user => user.id === +userId);

  if (!findUser) {
    res.status(400);
    res.send({});

    return;
  }

  const newExpense = {
    id: Math.floor(Math.random() * 100),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);
  res.status(201);
  res.send(newExpense);
});

router.delete('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  const filteredExpenses = expenses.filter(expense => (
    expense.id !== +expenseId
  ));

  if (filteredExpenses.length === expenses.length) {
    res.sendStatus(404);

    return;
  }

  expenses = filteredExpenses;
  res.sendStatus(204);
});

router.patch('/:expenseId', (req, res) => {
  const { expenseId } = req.params;
  const findExpense = expenses.find(expense => expense.id === +expenseId);

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = {
    ...findExpense,
    ...req.body,
  };

  Object.assign(findExpense, updatedExpense);

  res.send(findExpense);
});

module.exports = { router };
