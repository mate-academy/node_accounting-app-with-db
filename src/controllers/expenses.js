'use strict';

const expensesServices = require('../services/expenses');
const { isValidData } = require('../utils/validateExpensesHelper');

const getAllExpenses = async(req, res) => {
  const expenses = await expensesServices.getAllExpenses();

  res.send(expenses);
};

const getExpenseById = async(req, res) => {
  const { expenseId } = req.params;

  if (typeof +expenseId !== 'number'
    || +expenseId <= 0
  ) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = async(req, res) => {
  const data = req.body;

  if (!isValidData(data)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesServices.createExpense(data);

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesServices.getExpenseById(expenseId);

  if (typeof +expenseId !== 'number'
    || expenseId <= 0
  ) {
    res.sendStatus(400);

    return;
  }

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.removeExpense(expenseId);

  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const data = req.body;
  const foundExpense = await expensesServices.getExpenseById(expenseId);

  if (typeof +expenseId !== 'number' || !Number.isInteger(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  if (!isValidData(data)) {
    res.sendStatus(400);

    return;
  }

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.updateExpense(expenseId, data);

  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
