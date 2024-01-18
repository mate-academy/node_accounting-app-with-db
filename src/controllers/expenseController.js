'use strict';

const { getUserById } = require('../services/userServices');
const {
  getAllExpenses,
  getExpenseById,
  removeExpense,
  addNewExpense,
  updateExpense,
} = require('./../services/expensesServices');

const getAll = async(req, res) => {
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

const getOne = async(req, res) => {
  const { id } = req.params;

  const expense = await getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  };

  res.send(expense);
};

const removeOne = async(req, res) => {
  const { id } = req.params;
  const expense = await getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await removeExpense(id);

  res.sendStatus(204);
};

const add = async(req, res) => {
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

  const user = await getUserById(+userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await addNewExpense({
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

const updateOne = async(req, res) => {
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

  const expense = await getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await updateExpense(expense, title);

  res.send(expense);
};

module.exports = {
  getAll,
  add,
  getOne,
  removeOne,
  updateOne,
};
