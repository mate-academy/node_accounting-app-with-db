'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = async(req, res) => {
  const expenses = await expensesService.getAll();

  res.send(expenses);
};

const getById = async(req, res) => {
  const { expensesId } = req.params;

  const foundExpense = await expensesService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = async(req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.sendStatus(404);

    return;
  }

  const user = await usersService.getById(userId);

  if (!user.length) {
    res.sendStatus(404);

    return;
  }

  try {
    const newExpense = await expensesService.add(req.body);

    res.send(newExpense);
  } catch (e) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expensesService.getById(expensesId);

  if (!foundExpense.length) {
    res.sendStatus(404);

    return;
  }

  const expense = await expensesService.update(expensesId, req.body);

  res.send(expense[1]);
};

const remove = async(req, res) => {
  const { expensesId } = req.params;

  const foundExpense = await expensesService.getById(expensesId);

  if (!foundExpense.length) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(expensesId);
  res.sendStatus(204);
};

module.exports = {
  getAll, getById, add, update, remove,
};
