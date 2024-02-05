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

  if (id === undefined) {
    res.sendStatus(400);

    return;
  }

  try {
    const expense = await getExpensesById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  } catch (e) {
    res.sendStatus(404);
  }
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

  try {
    const isUserExist = await getUserById(userId);

    if (!isUserExist) {
      res.sendStatus(404);

      return;
    }

    const newExpense = await createExpense(
      userId, spentAt, title, amount, category, note
    );

    res.status(201).send(newExpense);
  } catch (e) {
    res.sendStatus(400);
  }
};

const deleteExp = async(req, res) => {
  const { id } = req.params;

  try {
    const isExpensesExist = await getExpensesById(id);

    if (isExpensesExist === null) {
      res.sendStatus(404);

      return;
    }

    await deleteExpenses(id);
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(404);
  }
};

const editExp = async(req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
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
  } catch (e) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAllExp,
  getOneExp,
  addExp,
  deleteExp,
  editExp,
};
