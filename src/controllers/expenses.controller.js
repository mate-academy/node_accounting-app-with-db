'use strict';

const { getUserById } = require('../services/users.service');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
} = require('./../services/expenses.service');

async function getExpenses(req, res) {
  try {
    const searchedExpenses = await getAllExpenses(req.query);

    res.send(searchedExpenses);
  } catch (err) {
    res.sendStatus(404);
  }
}

async function getOneExpense(req, res) {
  const { id } = req.params;

  const expense = await getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

async function createNewExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!getUserById(userId) || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201)
    .send(newExpense);
}

async function updateOneExpense(req, res) {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const normalizedId = +id;

  if (isNaN(normalizedId)) {
    res.sendStatus(400);

    return;
  }

  if ((spentAt && typeof spentAt !== 'string')
    || (title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (category && typeof category !== 'string')
  ) {
    res.sendStatus(404);

    return;
  }

  if (!await getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(await updateExpense({
    id: normalizedId,
    spentAt,
    title,
    amount,
    category,
    note,
  }));
}

async function deleteExpense(req, res) {
  const { id } = req.params;

  if (!await getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }
  await removeExpense(id);

  res.sendStatus(204);
}

module.exports = {
  getExpenses,
  getOneExpense,
  createNewExpense,
  updateOneExpense,
  deleteExpense,
};
