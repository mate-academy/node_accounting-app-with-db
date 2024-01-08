'use strict';

const {
  getUserById,
} = require('../services/users.service');

const {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  removeExpense,
  updateExpense,
} = require('../services/expenses.service');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = getAllExpenses(userId, categories, from, to);

  if (userId || categories || from || to) {
    if (!expenses.length) {
      res.sendStatus(404);

      return;
    }
  }

  res.send(expenses);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!spentAt
    || !title
    || !amount
    || !category
    || !note
  ) {
    res.sendStatus(400);

    return;
  }

  const user = getUserById(+userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = addNewExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.send(newExpense);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const removeOne = (req, res) => {
  const { id } = req.params;
  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  removeExpense(id);

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, note } = req.body;

  if (
    (spentAt && typeof spentAt !== 'string')
    || (title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (note && typeof note !== 'string')
  ) {
    res.sendStatus(404);
  }

  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  updateExpense(id, title);

  res.send(expense);
};

module.exports = {
  get,
  add,
  getOne,
  removeOne,
  updateOne,
};
