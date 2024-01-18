'use strict';

const { getUserById } = require('../services/userServises');
const {
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  postNewExpense,
  updateExpense,
} = require('./../services/expensesServices');

const getExpenses = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await getAllExpenses(userId, categories, from, to);

  if (userId || categories || from || to) {
    if (!expenses.length) {
      res.sendStatus(404);

      return;
    }
  }

  res.send(expenses);
};

const getExpense = async(req, res) => {
  const { id } = req.params;

  const expense = await getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  };

  res.send(expense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;
  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  deleteExpense(id);

  res.sendStatus(204);
};

const postExpense = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const user = await getUserById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await postNewExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const updateOne = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, note } = req.body;

  if ((spentAt && typeof spentAt !== 'string')
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
  getExpenses,
  postExpense,
  getExpense,
  removeExpense,
  updateOne,
};
