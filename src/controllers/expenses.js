'use strict';

const userService = require('../services/users.js');
const expenseService = require('../services/expenses.js');

const getAll = async(req, res) => {
  const { userId, from, to, category } = req.query;

  const expenses = await expenseService.getAll();

  if (from && to) {
    const expensesBetweenDates = await expenseService
      .getExpensesBetweenDates(from, to);

    res.send(expensesBetweenDates);

    return;
  }

  if (category) {
    const categoryExpenses = await expenseService
      .getExpenseByCategory(category);

    res.send(categoryExpenses);

    return;
  }

  if (userId) {
    const userExpenses = await expenseService
      .getExpenseByUser(userId);

    res.send(userExpenses);

    return;
  }

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = async(req, res) => {
  const { userId, title, amount, category, note } = req.body;

  const foundUser = userService.getUserById(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService
    .createExprense(userId, title, amount, category, note);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId, title, amount, category, note } = req.body;
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.updateExpense(foundExpense,
    expenseId, userId, title, amount, category, note,
  );

  res.send(foundExpense);
};

module.exports = {
  getOne,
  getAll,
  add,
  remove,
  update,
};
