'use strict';

const { normalizeExpense } = require('../models/Expense.model');
const {
  getAll,
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../services/expenses.serveces');
const { getUser } = require('../services/users.serveces');

const getAllExpenses = async(req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.body;

  let expenses = [];

  if (!userId && !categories && !from && !to) {
    expenses = await getAll();
  } else {
    expenses = await getExpenses({
      userId, categories, from, to,
    });
  }

  if (!expenses.length) {
    res.status(200);
    res.send([]);
  } else {
    res.status(200);
    res.send(expenses.map(expense => normalizeExpense(expense)));
  }
};

const createOneExpense = async(req, res) => {
  const {
    userId,
    title,
    spentAt,
    category,
    amount,
    note,
  } = req.body;

  if (typeof userId !== 'number'
    || typeof title !== 'string'
    || typeof category !== 'string'
    || typeof spentAt !== 'string'
    || typeof amount !== 'number') {
    res.status(400);
    res.send('Some of your data are not valid');

    return;
  }

  if (!getUser(userId)) {
    res.status(400);
    res.send('User not found');
  }

  try {
    await createExpense({
      userId,
      title,
      spentAt,
      category,
      amount,
      note,
    });
  } catch (error) {
    res.status(400);
    res.send('Something went wrong');

    return;
  }

  res.sendStatus(201);
};

const getOneExpense = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.send('The id is invalid');

    return;
  }

  const expense = await getExpense(id);

  if (!expense) {
    res.status(404);
    res.send('Not found');

    return;
  }

  res.status(200);
  res.send(normalizeExpense(expense));
};

const deleteOneExpense = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.send('The id is invalid');

    return;
  }

  if (!getExpense(id)) {
    res.status(404);
    res.send('Not found');

    return;
  }

  await deleteExpense(id);

  res.sendStatus(204);
};

const updateOneExpense = async(req, res) => {
  const { id } = req.params;
  const {
    title,
    spentAt,
    category,
    amount,
    note,
  } = req.body;

  if (!id) {
    res.status(400);
    res.send('The id is invalid');

    return;
  }

  if (!getExpense(id)) {
    res.status(404);
    res.send('Not found');

    return;
  }

  await updateExpense({
    id,
    title,
    spentAt,
    category,
    amount,
    note,
  });

  res.sendStatus(200);
};

module.exports = {
  getAllExpenses,
  createOneExpense,
  getOneExpense,
  deleteOneExpense,
  updateOneExpense,
};
