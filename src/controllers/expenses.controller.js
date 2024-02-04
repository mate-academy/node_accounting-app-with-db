'use strict';

const { normalizeExpense } = require('../models/Expense.model');
const {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../services/expenses.serveces');

const getAllExpenses = async(req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.body;

  if (!userId || !categories || !from || !to) {
    res.sendStatus(400);
    res.message = 'Some of your data are not valid';

    return;
  }

  const expenses = await getExpenses(userId, categories, from, to);

  res.statusCode(200);
  res.send(normalizeExpense(expenses));
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

  try {
    const expense = await createExpense(
      userId,
      title,
      spentAt,
      category,
      amount,
      note,
    );

    res.statusCode(201);

    res.send(normalizeExpense(expense));
  } catch (error) {
    res.sendStatus(400);
    res.message = 'Some of your data are not valid';
  }
};

const getOneExpense = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The id is invalid';

    return;
  }

  try {
    const expense = await getExpense(id);

    res.sendStatus(200);
    res.send(normalizeExpense(expense));
  } catch (error) {
    res.sendStatus(404);
  }
};

const deleteOneExpense = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
    res.message = 'The id is invalid';

    return;
  }

  try {
    await deleteExpense(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
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
    res.sendStatus(400);
    res.message = 'The id is invalid';

    return;
  }

  if (!getExpense(id)) {
    res.sendStatus(404);

    return;
  }

  try {
    const updatedExpense = await updateExpense({
      id,
      title,
      spentAt,
      category,
      amount,
      note,
    });

    res.sendStatus(200);
    res.send(normalizeExpense(updatedExpense));
  } catch (error) {
    res.sendStatus(400);
    res.message = 'Some of your data are not valid';
  }
};

module.exports = {
  getAllExpenses,
  createOneExpense,
  getOneExpense,
  deleteOneExpense,
  updateOneExpense,
};
