'use strict';

const {
  getAll,
  createExpense,
  getOne,
  deleteOne,
  updateOne,
} = require('../services/expenseService');
const { validateExpenseBody } = require('../utils/helpers');

const validateBody = (req, res, next) => {
  if (!validateExpenseBody(req.body)) {
    res.sendStatus(400);

    return;
  }

  next();
};

const getAllExpenses = async (req, res) => {
  try {
    const result = await getAll(req.query);

    res.send(result);
  } catch (e) {
    res.sendStatus(500);
  }
};

const createNewExpense = async (req, res) => {
  try {
    const expense = await createExpense(req.body);

    res.status(201).json(expense);
  } catch (e) {
    res.sendStatus(500);
  }
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await getOne(id);

    if (expense === null) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  } catch (e) {
    res.sendStatus(500);
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const status = await deleteOne(id);

    if (status === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const [status, user] = await updateOne(id, req.body);

    if (status === 0) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAllExpenses,
  createNewExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  validateBody,
};
