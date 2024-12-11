const expensesServices = require('../services/expenses.services');
const { isExpenseValid } = require('../utils/expenses.js');
const { isUserExist } = require('../utils/users');

const getExpenses = (req, res) => {
  const { categories, userId, from, to } = req.query;

  let categoriesArray = categories;

  if (categories) {
    categoriesArray = Array.isArray(categories) ? categories : [categories];
  }

  return res
    .status(200)
    .json(expensesServices.getExpenses(categoriesArray, userId, from, to));
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const expenseId = Number(id);

  if (isNaN(expenseId)) {
    return res.sendStatus(400);
  }

  const expense = expensesServices.getExpenseById(expenseId);

  return !expense ? res.sendStatus(404) : res.status(200).json(expense);
};

const saveExpense = (req, res) => {
  if (!(isExpenseValid(req.body) && isUserExist(+req.body.userId))) {
    return res.sendStatus(400);
  }

  const newExpense = expensesServices.saveExpense(req.body);

  return res.status(201).json(newExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const expenseId = Number(id);

  const expense = expensesServices.getExpenseById(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  expensesServices.removeExpense(expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const expenseId = Number(req.params.id);

  if (!expensesServices.getExpenseById(expenseId)) {
    return res.sendStatus(404);
  }

  const updatedExpense = expensesServices.updateExpense(expenseId, req.body);

  return res.status(200).json(updatedExpense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  saveExpense,
  removeExpense,
  updateExpense,
};
