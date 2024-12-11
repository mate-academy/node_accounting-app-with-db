const expensesServices = require('../services/expenses.services');
const usersServices = require('../services/users.services');

const { asyncHandler } = require('../utils/asyncHandler.js');
const { isExpenseValid } = require('../utils/expenses.js');
const { getErrorWithStatus } = require('../utils/getError.js');

const getExpenses = async (req, res) => {
  const { categories, userId, from, to } = req.query;

  let categoriesArray = categories;

  if (categories) {
    categoriesArray = Array.isArray(categories) ? categories : [categories];
  }

  const expenses = await expensesServices.getExpenses(
    categoriesArray,
    userId,
    from,
    to,
  );

  return res.status(200).json(expenses);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  const expenseId = Number(id);

  if (isNaN(expenseId)) {
    throw getErrorWithStatus(400, 'Wrong type of expenseId');
  }

  const expense = await expensesServices.getExpenseById(expenseId);

  if (!expense) {
    throw getErrorWithStatus(404, 'Expense not found');
  }

  return res.status(200).json(expense);
};

const createExpense = async (req, res) => {
  const user = await usersServices.getUserById(+req.body.userId);

  if (!user) {
    throw getErrorWithStatus(400, 'User not found');
  }

  if (!isExpenseValid(req.body)) {
    throw getErrorWithStatus(400, 'Wrong types');
  }

  const newExpense = await expensesServices.createExpense(req.body);

  return res.status(201).json(newExpense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  const expenseId = Number(id);

  const expense = await expensesServices.getExpenseById(expenseId);

  if (!expense) {
    throw getErrorWithStatus(404, 'Expense not found');
  }

  await expensesServices.removeExpense(expenseId);

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const expenseId = Number(req.params.id);

  const expense = await expensesServices.getExpenseById(expenseId);

  if (!expense) {
    throw getErrorWithStatus(404, 'Expense not found');
  }

  await expensesServices.updateExpense(expenseId, req.body);

  const updatedExpense = await expensesServices.getExpenseById(expenseId);

  return res.status(200).json(updatedExpense);
};

module.exports = {
  getExpenses: asyncHandler(getExpenses),
  getExpenseById: asyncHandler(getExpenseById),
  createExpense: asyncHandler(createExpense),
  removeExpense: asyncHandler(removeExpense),
  updateExpense: asyncHandler(updateExpense),
};
