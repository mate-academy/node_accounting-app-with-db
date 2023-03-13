'use strict';

const expensesServices = require('../services/expenses');
const { getUserById } = require('../services/users');

async function getAll(req, res) {
  const params = req.query;
  const expenses = await expensesServices.getFilteredExpenses(params);

  res.send(expenses.map(expensesServices.normalizeExpense));
}

async function getOne(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesServices.normalizeExpense(foundExpense));
}

async function addNewExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  const foundUser = await getUserById(userId);

  const isAllDataProvided = (foundUser
    && userId
    && spentAt
    && title
    && amount
    && category
  );

  if (!isAllDataProvided) {
    res.sendStatus(400);

    return;
  }

  const expenseData = req.body;
  const newExpense = await expensesServices.createExpense(expenseData);

  res.statusCode = 201;
  res.send(expensesServices.normalizeExpense(newExpense));
}

async function deleteExpense(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expenseToDelete = await expensesServices.getExpenseById(expenseId);

  if (!expenseToDelete) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.deleteExpense(expenseId);
  res.sendStatus(204);
}

async function updateExpense(req, res) {
  const { expenseId } = req.params;
  const dataToUpdate = req.body;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expenseToUpdate = await expensesServices.getExpenseById(expenseId);

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesServices.updateExpense(
    expenseId,
    dataToUpdate,
  );

  res.send(expensesServices.normalizeExpense(updatedExpense));
}

module.exports = {
  getAll,
  getOne,
  addNewExpense,
  deleteExpense,
  updateExpense,
};
