'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getAll = async(req, res) => {
  const queryUrl = req.url.replace('/', '');

  if (queryUrl) {
    const filteredExpenses
      = await expensesService.getFilteredExpenses(req.query);

    res.send(filteredExpenses);

    return;
  }

  const expenses = await expensesService.getExpenses();

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const add = async(req, res) => {
  const { userId } = req.body;

  const user = await usersService.getUser(userId);

  if (!user || Object.keys(req.body) < 6) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.createExpense(req.body);

  res.statusCode = 201;
  res.send(expense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const expense = await expensesService.getExpense(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteExpense(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const expense = await expensesService.getExpense(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.updateExpense({
    id: expenseId,
    data: req.body,
  });

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  add,
  getAll,
  getOne,
  remove,
  update,
};
