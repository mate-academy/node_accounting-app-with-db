'use strict';

const {
  createExpense,
  findExpenses,
  getExpenseId,
  patchExpenseId,
  deleteExpenseId,
} = require('../services/expensesService');

const createExpenseController = async (req, res) => {
  try {
    const newExpense = await createExpense(req.body);

    if (!newExpense) {
      res.status(400);
      res.end();
    } else {
      res.status(201);
      res.json(newExpense);
    }
  } catch (error) {
    res.status(400);
    res.end();
  }
};

const getExpenses = async (req, res) => {
  const expenses = await findExpenses(req.query);

  if (!expenses) {
    res.status(404);
    res.end();
  } else {
    res.status(200);
    res.json(expenses);
  }
};

const getExpenseById = async (req, res) => {
  const id = req.params.id;
  const expenseId = await getExpenseId(id);

  if (!expenseId) {
    res.status(404);
    res.end();
  } else {
    res.status(200);
    res.json(expenseId);
  }
};

const patchExpenseById = async (req, res) => {
  const id = req.params.id;
  const expenseBody = req.body;
  const expenseUpdated = await patchExpenseId(id, expenseBody);

  if (!expenseUpdated) {
    res.status(404);
    res.end();
  } else {
    res.status(200);
    res.json(expenseUpdated);
  }
};

const deleteExpenseById = async (req, res) => {
  const id = req.params.id;
  const expenseRemoved = await deleteExpenseId(id);

  if (!expenseRemoved) {
    res.status(404);
    res.end();
  } else {
    res.status(204).end();
  }
};

module.exports = {
  createExpenseController,
  getExpenses,
  getExpenseById,
  patchExpenseById,
  deleteExpenseById,
};
