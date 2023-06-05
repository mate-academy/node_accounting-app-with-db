'use strict';

const usersService = require('../services/users');
const expenseService = require('../services/expenses');
const getAll = async(req, res) => {
  const expenses = await expenseService.getAllExpenses(req.query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.getOneExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
  } = req.body;

  const users = await usersService.getAllUsers();
  const allUsersId = users.map(({ id }) => id);
  const hasUser = allUsersId.includes(userId);
  const hasAllData = userId && title && spentAt;

  if (!hasUser || !hasAllData) {
    res.sendStatus(400);

    return;
  }

  const expense = await expenseService.createExpense(req.body);

  res.statusCode = 201;
  res.send(expense);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const updatedExpense = await expenseService
    .updateExpense(expenseId, req.body);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  await expenseService.removeExpense(expenseId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};

