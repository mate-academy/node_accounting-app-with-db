'use strict';

const { findUserService } = require('../services/users.service');
const {
  createExpenseService,
  findExpenseService,
  updateExpenseService,
  deleteExpenseService,
  expenses,
} = require('../services/expenses.service');

function createExpense(req, res) {
  const expense = req.body;
  const { userId, spentAt, title, amount, category, note } = expense;

  if (
    !userId ||
    !spentAt ||
    !title ||
    !amount ||
    !category ||
    !note ||
    !findUserService(userId)
  ) {
    res.sendStatus(400);
  } else {
    const newExpense = createExpenseService(expense);

    res.status(201).send(newExpense);
  }
}

function getExpenses(req, res) {
  const { userId, from, to, categories } = req.query;

  const filteredExpenses = expenses.filter((expense) => {
    if (userId && expense.userId !== parseInt(userId)) {
      return false;
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const spentAt = new Date(expense.spentAt);

      if (spentAt < fromDate || spentAt > toDate) {
        return false;
      }
    }

    if (categories && !categories.split(',').includes(expense.category)) {
      return false;
    }

    return true;
  });

  res.send(filteredExpenses);
}

function getExpense(req, res) {
  const expenseId = parseInt(req.params.id);
  const expense = findExpenseService(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.status(200).send(expense);
}

function updateExpense(req, res) {
  const expenseId = parseInt(req.params.id);
  const { title } = req.body;
  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === expenseId,
  );

  if (expenseIndex === -1) {
    res.sendStatus(404);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = updateExpenseService(expenseIndex, title);

  res.send(updatedExpense);
}

function deleteExpense(req, res) {
  const expenseId = parseInt(req.params.id);
  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === expenseId,
  );

  if (expenseIndex === -1) {
    res.sendStatus(404);

    return;
  }

  deleteExpenseService(expenseIndex);

  res.sendStatus(204);
}

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
