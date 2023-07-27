'use strict';

const expenseServices = require('../services/expenseServices');

const getAll = (req, res) => {
  const expenses = expenseServices.getAllExpenses(req.query);

  res.status(200).send(expenses);
};

const createExpense = (req, res) => {
  const isValidRequest = expenseServices.validateData(req.body);

  if (!isValidRequest) {
    res.status(400).send({ message: 'Validation error' });

    return;
  }

  const newExpense = expenseServices.create(req.body);

  res.status(201).send(newExpense);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseServices.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;

  const existingExpense = expenseServices.getExpenseById(+expenseId);

  if (!existingExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.removeExpense(+expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const expense = req.body;
  const { expenseId } = req.params;

  const existingExpense = expenseServices.getExpenseById(+expenseId);

  if (!existingExpense) {
    res
      .status(404)
      .send({ message: 'Expense not found' });

    return;
  }

  const updatedExpense = expenseServices.updateExpense(+expenseId, expense);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  createExpense,
  getOneExpense,
  removeExpense,
  updateExpense,
};
