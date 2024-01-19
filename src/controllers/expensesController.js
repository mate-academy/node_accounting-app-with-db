'use strict';

const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
} = require('../services/expensesService');

const { getUserById } = require('../services/usersService');

const getExpenses = async(req, res) => {
  try {
    const expenses = await getAllExpenses(req.query);

    res.status(200).send(expenses);
  } catch (error) {
    res.send(error.message);
  }
};

const getOneExpense = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  try {
    const expense = await getExpenseById(id);

    if (!expense) {
      res.sendStatus(404);
    }

    res.send(expense);
  } catch (error) {
    res.sen(error.message);
  }
};

const createNewExpense = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  if (!getUserById(userId) || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  try {
    const newExpense = await createExpense(req.body);

    res.status(201).send(newExpense);
  } catch (error) {
    res.send(error.message);
  }
};

const updateOneExpense = async(req, res) => {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  if (!(id)) {
    res.sendStatus(400);

    return;
  }

  if ((spentAt && typeof spentAt !== 'string')
    || (title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (category && typeof category !== 'string')
  ) {
    res.sendStatus(400);

    return;
  }

  if (!getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  try {
    const updatedExpense = await updateExpense(req.body);

    res.send(updatedExpense);
  } catch (error) {
    res.send(error.message);
  }
};

const deleteExpense = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!getExpenseById(+id)) {
    res.sendStatus(404);

    return;
  }

  try {
    const isDeleted = await removeExpense(id);

    if (isDeleted) {
      res.sendStatus(204);
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getExpenses,
  getOneExpense,
  createNewExpense,
  updateOneExpense,
  deleteExpense,
};
