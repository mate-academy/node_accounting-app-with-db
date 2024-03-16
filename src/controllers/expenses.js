'use strict';

const { findUserService } = require('../services/users.service');
const {
  createExpenseService,
  findExpenseService,
  updateExpenseService,
  deleteExpenseService,
  getAllExpensesService,
  normalizeExpense,
} = require('../services/expenses.service');

async function createExpense(req, res) {
  const expense = req.body;
  const { userId, spentAt, title, amount } = expense;

  if (!userId || !spentAt || !title || !amount || !findUserService(userId)) {
    res.sendStatus(400);
  } else {
    const newExpense = await createExpenseService(expense);

    res.status(201).send(normalizeExpense(newExpense));
  }
}

async function getExpenses(req, res) {
  const { userId, from, to, categories } = req.query;

  const filteredExpenses = (await getAllExpensesService()).filter((expense) => {
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

  res.send(filteredExpenses.map((expense) => normalizeExpense(expense)));
}

async function getExpense(req, res) {
  const expenseId = parseInt(req.params.id);
  const expense = await findExpenseService(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.status(200).send(normalizeExpense(expense));
}

async function updateExpense(req, res) {
  const { id } = req.params;
  const { title } = req.body;
  const expenseIndex = (await getAllExpensesService()).findIndex(
    (expense) => expense.id === +id,
  );

  if (expenseIndex === -1) {
    res.sendStatus(404);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await updateExpenseService(id, title);

  res.send(normalizeExpense(updatedExpense));
}

async function deleteExpense(req, res) {
  const { id } = req.params;
  const expenseIndex = (await getAllExpensesService()).findIndex(
    (expense) => expense.id === +id,
  );

  if (expenseIndex === -1) {
    res.sendStatus(404);

    return;
  }

  await deleteExpenseService(id);

  res.sendStatus(204);
}

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
