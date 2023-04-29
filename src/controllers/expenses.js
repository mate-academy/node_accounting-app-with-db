'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = async(req, res) => {
  const query = req.query;

  const visibleExpenses = await expensesService.getAll(query);

  res.send(visibleExpenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = async(req, res) => {
  const expenseBody = req.body;
  const { userId } = expenseBody;
  const foundUser = await usersService.getById(userId);

  if (Object.values(expenseBody).length < 6 || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create(expenseBody);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const expense = req.body;
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (Object.values(expense).length === 0) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await expensesService.update(
    expenseId,
    expense,
  );

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
