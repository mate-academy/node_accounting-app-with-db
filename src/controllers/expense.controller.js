'use strict';

const expenseService = require('../service/expenses.services');
const usersService = require('../service/users.services');

const getFilteredExpenses = async(req, res) => {
  const expenses = await expenseService.getAllExpenses(req.query);

  res.send(expenses);
};

const getOneExpense = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.status(400).send('Data Not Found');

    return;
  }

  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense Not Found');

    return;
  }

  res.send(foundExpense);
};

const createExpense = async(req, res) => {
  const {
    userId,
    title,
    spentAt,
    amount,
    category,
  } = req.body;

  if (!userId || !title || !spentAt || !amount || !category) {
    res.status(400).send('Not all data is provided');

    return;
  }

  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.status(400).send('User Not Found');

    return;
  }

  const newExpense = await expenseService.createExpense(req.body);

  res.status = 201;
  res.send(newExpense);
};

const removeExpense = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense Not Found');

    return;
  }

  await expenseService.removeExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense Not Found');

    return;
  }

  const updateData = { ...req.body };

  await expenseService.updateExpense(expenseId, updateData);
  res.send(foundExpense);
};

module.exports = {
  getFilteredExpenses,
  getOneExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
