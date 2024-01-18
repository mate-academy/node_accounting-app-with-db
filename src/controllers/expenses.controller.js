'use strict';

const expenseService = require('../services/expenses.service');

const getAllExpenses = async(req, res) => {
  const expenses = await expenseService.getAllExpenses(req.query);

  res.send(expenses);
};

const getExpenseById = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    return res.status(404).send('No expenses found.');
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const createNewExpense = async(req, res) => {
  const newExpense = req.body;
  const { title, userId } = newExpense;

  if (!title || !userId) {
    return res.status(400).send('Cannot find your value.');
  }

  await expenseService.createNewExpense(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    return res.status(404).send('No expenses found.');
  }

  await expenseService.removeExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const newData = req.body;

  if (!expenseId) {
    return res.sendStatus(400).send('No expenses found by your id.');
  }

  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    return res.status(404).send('No expenses found.');
  }

  const updatedExpense = await expenseService.updateExpense(expenseId, newData);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createNewExpense,
  deleteExpense,
  updateExpense,
};
