'use strict';

const expensesService = require('../services/expenses.service');
const { isValidDate } = require('../middleware/middleware');

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expensesService.getAll(req.query);

    res.json(expenses);
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

const getOneExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expensesService.getById(+id);

    if (!expense) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }
    res.json(expense);
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

const createExpense = async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!spentAt || !title || !amount || !userId || !isValidDate(req.body)) {
      res.statusCode = 400;
      res.statusMessage = 'Error';
      res.end();
    }

    const newExpense = await expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.json(newExpense);
    res.end();
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const expense = await expensesService.getById(+id);

    if (!expense) {
      res.statusCode = 404;
      res.statusMessage = 'Error';
      res.end();
    }

    const updatedExpense = await expensesService.update(id, data);

    res.json(updatedExpense);
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

const removeExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expensesService.getById(+id);

    if (!expense) {
      return res.sendStatus(404);
    }

    expensesService.remove(+id);
    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.statusMessage = 'Something went wrong';
    res.end();
  }
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  removeExpense,
};
