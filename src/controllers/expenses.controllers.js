'use strict';

const expensesServices = require('../services/expenses.services');
const usersServices = require('../services/users.services');
const { normalizeExpense } = require('../helpers');

const getFilteredExpenses = async(request, response) => {
  const expenses = await expensesServices.getFiltered(request.query);

  response.send(expenses.map(expense => normalizeExpense(expense)));
};

const getOneExpense = async(request, response) => {
  const { expenseId } = request.params;

  if (!expenseId) {
    response.sendStatus(400);

    return;
  }

  const foundExpense = await expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    response.sendStatus(404);

    return;
  }

  response.send(normalizeExpense(foundExpense));
};

const createExpense = async(request, response) => {
  const {
    userId,
    title,
    spentAt,
    amount,
    category,
  } = request.body;

  if (!userId || !title || !spentAt || !amount || !category) {
    response.sendStatus(400);

    return;
  }

  const foundUser = await usersServices.getUserById(userId);

  if (!foundUser) {
    response.sendStatus(400);

    return;
  }

  const newExpense = await expensesServices.createExpense(request.body);

  response.statusCode = 201;
  response.send(normalizeExpense(newExpense));
};

const removeExpense = async(request, response) => {
  const { expenseId } = request.params;
  const foundExpense = await expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    response.sendStatus(404);

    return;
  }

  await expensesServices.removeExpense(expenseId);
  response.sendStatus(204);
};

const updateExpense = async(request, response) => {
  const { expenseId } = request.params;
  const foundExpense = await expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    response.sendStatus(404);

    return;
  }

  if (Object.keys(request.body).length === 0) {
    response.sendStatus(400);

    return;
  }

  const updatedExpense = await expensesServices.updateExpense(
    expenseId, request.body,
  );

  response.send(normalizeExpense(updatedExpense));
};

module.exports = {
  getFilteredExpenses,
  getOneExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
