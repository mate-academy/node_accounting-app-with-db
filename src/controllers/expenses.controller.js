/* eslint-disable no-console */
'use strict';

const {
  getAllExpenses,
  getExpensesById,
  createExpense,
  deleteExpenses,
  editExpense,
} = require('../services/expenses.services');

const { getUserById } = require('../services/users.services.js');

const getAllExp = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await getAllExpenses({
    userId, categories, from, to,
  });

  res.send(expenses);
};

const getOneExp = async(req, res) => {
  const { id } = req.params;
  const expense = await getExpensesById(id);

  if (id === undefined) {
    res.sendStatus(400);

    return;
  }

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const addExp = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userId === undefined
    || !spentAt
    || !title
    || amount === undefined
    || !category) {
    res.sendStatus(400);

    return;
  }

  if (await getUserById(userId) === null) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await createExpense(
    userId, spentAt, title, amount, category, note
  );

  res.status(201);
  res.send(newExpense);
};

const deleteExp = async(req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line max-len
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  const isExpensesExist = await getExpensesById(id);

  if (isExpensesExist === null || !id.match(pattern)) {
    res.sendStatus(404);

    return;
  }

  await deleteExpenses(id);
  res.sendStatus(204);
};

const editExp = async(req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const expendeToEdit = await getExpensesById(id);

  if (expendeToEdit === null) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(422);

    return;
  }

  const editedExpense = await editExpense(title, id);

  res.send(editedExpense);
};

module.exports = {
  getAllExp,
  getOneExp,
  addExp,
  deleteExp,
  editExp,
};
