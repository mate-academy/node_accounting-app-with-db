'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const getAllExpenses = async(req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.send(expenses);
};

const getExpenseById = async(req, res) => {
  const { expenseId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.findById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExpense = async(req, res) => {
  const data = req.body;
  const userExpense = await userService.findById(data.userId);

  if (!Object.entries(data).length || !userExpense) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create(data);

  res.status(201).send(newExpense);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const body = req.body;
  const regex = /^\d+$/;

  if (!regex.test(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.update(expenseId, body);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpenseId = await expensesService.remove(expenseId);

  if (!foundExpenseId) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
