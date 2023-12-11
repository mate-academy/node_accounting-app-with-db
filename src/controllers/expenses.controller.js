'use strict';

const {
  getByQuery,
  create,
  remove,
  update,
  normalizeExpense,
} = require('../services/expenses.services');
const { getOne } = require('../services/users.service');

const getAllExpenses = async(req, res) => {
  const searchQuery = req.query;

  const expenses = await getByQuery(searchQuery);

  res.send(expenses.map(expense => normalizeExpense(expense)));
};

const getExpenseById = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await getByQuery({ id });

  if (!expense.length) {
    res.sendStatus(404);

    return;
  }

  res.send(normalizeExpense(expense[0]));
};

const createExpense = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const userExist = await getOne(userId);

  if (!userExist || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense
    = await create(userId, spentAt, title, amount, category, note);

  res.statusCode = 201;
  res.send(normalizeExpense(newExpense));
};

const removeExpense = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await getByQuery({ id });

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await remove(id);

  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { id } = req.params;
  const newData = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = await getByQuery({ id });

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await update(id, newData);

  res.setHeader('content-type', 'application/json');
  res.send(normalizeExpense(updatedExpense));
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
