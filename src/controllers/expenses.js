'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = async(req, res) => {
  const { userId, category, from, to } = req.query;
  const foundExpenses = await expensesService
    .getAll(userId, category, from, to);

  res.send(foundExpenses);
};

const addOne = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = await usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.addOne(
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

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expensesService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const deleteOne = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expensesService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOne(expenseId);
  res.sendStatus(204);
};

const updateOne = async(req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  let foundExpense = await expensesService.getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  foundExpense = await expensesService.updateOne(expenseId, title);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
