'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;
  const foundExpenses = expensesService.getAll(userId, category, from, to);

  res.send(foundExpenses);
};

const addOne = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addOne(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const deleteOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOne(expenseId);
  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  let foundExpense = expensesService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  foundExpense = expensesService.updateOne(expenseId, title);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
