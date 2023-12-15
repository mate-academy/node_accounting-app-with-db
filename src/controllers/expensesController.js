'use strict';

const {
  getAll,
  createExpense,
  getOne,
  deleteOne,
  updateOne,
} = require('../services/expenseService');
const { validateExpenseBody } = require('../utils/helpers');

const getAllExpenses = async (req, res) => {
  try {
    const result = await getAll(req.query);

    res.send(result);
  } catch (e) {
    res.sendStatus(400);
  }
};

const createNewExpense = async (req, res) => {
  try {
    if (!validateExpenseBody(req.body)) {
      throw new Error('Bad request');
    }

    const expense = await createExpense(req.body);

    res.status(201).json(expense);
  } catch (e) {
    res.sendStatus(400);
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
    res.sendStatus(400);
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
    res.sendStatus(400);
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  try {
    if (!validateExpenseBody(req.body)) {
      throw new Error('Bad request');
    }

    const [status, user] = await updateOne(id, req.body);

    if (status === 0) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch (e) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAllExpenses,
  createNewExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
