'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAllExpenses = async(req, res) => {
  const { userId, category, from, to } = req.query;

  const filteredExpenses = await expensesService
    .getAllExpenses(userId, category, from, to);

  res.send(filteredExpenses);
};

const getExpensesById = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expensesService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const foundUser = await usersService.getUserById(userId);

  if (!title || !foundUser || !amount || !spentAt || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.addExpense(req.body);

  res.statusCode = 201;

  res.send(newExpense);
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expensesService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteExpense(expenseId);

  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expensesService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService
    .updateExpense(foundExpense, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  addExpense,
  deleteExpense,
  updateExpense,
};
