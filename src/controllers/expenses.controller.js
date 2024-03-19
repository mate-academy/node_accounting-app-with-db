'use strict';

const expenseService = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');
const { NOT_FOUND, BAD_REQUEST, NO_CONTENT, CREATED } = require('../constants');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(await expenseService.getAllExpenses(userId, categories, from, to));
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getExpenseById(+id);

  if (!expense) {
    res.status(NOT_FOUND).send();

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const newExpense = req.body;
  const { userId } = req.body;

  const existUser = await getUserById(userId);

  if (!existUser) {
    return res.status(BAD_REQUEST).send();
  }

  const createdExpense = await expenseService.createExpense(newExpense);

  res.status(CREATED).send(createdExpense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!newExpense) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    res.status(NOT_FOUND).send();

    return;
  }

  const updatedExpense = await expenseService.updateExpense(id, newExpense);

  if (!updatedExpense) {
    res.status(NOT_FOUND).send();

    return;
  }

  res.send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    res.status(NOT_FOUND).send();

    return;
  }

  await expenseService.removeExpense(+id);
  res.status(NO_CONTENT).send();
};

module.exports = {
  getAll,
  getOneById,
  create,
  update,
  remove,
};
