'use strict';

const {
  getAll,
  getById,
  create,
  remove,
  update,
  getAllForUser,
  getAllForCategory,
  getAllBetweenDates,
  normalize,
} = require('../services/expenses');

const { getById: getUserById } = require('../services/users');

const getAllExpenses = async(req, res) => {
  const { userId } = req.query;
  const { categories } = req.query;
  const { from, to } = req.query;
  let expenses;

  if (userId && !categories) {
    expenses = await getAllForUser(userId);
    res.send(expenses.map(normalize));

    return;
  }

  if (userId && categories) {
    expenses = await getAllForCategory(userId, categories);

    res.send(expenses.map(normalize));

    return;
  }

  if (from && to) {
    expenses = await getAllBetweenDates(from, to);

    res.send(expenses.map(normalize));

    return;
  }

  expenses = await getAll();

  res.send(expenses.map(normalize));
};

const getExpenseById = async(req, res) => {
  const { id } = req.params;
  const foundExpense = await getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(foundExpense));
};

const createExpense = async(req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.sendStatus(400);

    return;
  }

  const user = await getUserById(req.body.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await create({ ...req.body });

  res.statusCode = 201;
  res.send(normalize(newExpense));
};

const removeExpense = (req, res) => {
  const { id } = req.params;
  const foundExpense = getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  remove(id);
  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { id } = req.params;

  const foundExpense = getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const result = await update(id, { ...req.body });

  res.send(result);
};

module.exports = {
  getAllExpenses, getExpenseById, createExpense, removeExpense, updateExpense,
};
