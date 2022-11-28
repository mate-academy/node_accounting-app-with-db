'use strict';

const expensesServices = require('../services/expenses');
const { isValidData } = require('../utils/validateExpensesHelper');
const { getUserById } = require('../services/users');

const getAllExpenses = async(req, res) => {
  const expenses = await expensesServices.getAllExpenses();

  res.send(expenses);
};

const getExpenseById = async(req, res) => {
  const { expenseId } = req.params;

  if (isNaN(parseInt(expenseId))) {
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
  const foundUser = getUserById(data.userId);

  if (!isValidData(data, req.method) || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesServices.createExpense(data);

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = async(req, res) => {
  const { expenseId } = req.params;

  if (isNaN(parseInt(expenseId))) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expensesServices.getExpenseById(expenseId);

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

  if (isNaN(parseInt(expenseId))) {
    res.sendStatus(400);

    return;
  }

  const foundUser = getUserById(data.userId);

  if (!isValidData(data) || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.updateExpense(expenseId, data);

  const updatedExpense = await expensesServices.getExpenseById(expenseId);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
