'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');
const { NO_CONTENT, NOT_FOUND, BAD_REQUEST, CREATED } = require('../variables');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(await expensesService.getExpenses(userId, categories, from, to));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const newExpenses = req.body;

  if (!(await userService.getUserById(newExpenses.userId))) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  res.status(CREATED).send(await expensesService.createExpenses(newExpenses));
};

const remove = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  await expensesService.deleteExpense(id);
  res.sendStatus(NO_CONTENT);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!newExpense) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const updatedExpense = await expensesService.updateExpense(id, newExpense);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
