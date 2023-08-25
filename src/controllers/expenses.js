'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getExpenses = async(req, res) => {
  const newExpenses = await expenseService.getAll(req.query);

  res.send(newExpenses);
};

const getExpenseById = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = async(req, res) => {
  const { title, userId } = req.body;
  const foundUser = await userService.getById(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const createdExpense = await expenseService.create(req.body);

  res.status(201).send(createdExpense);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if ('id' in req.body) {
    res.sendStatus(400);

    return;
  }

  await expenseService.update(+expenseId, req.body);

  res.send(foundExpense);
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(+expenseId);

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
