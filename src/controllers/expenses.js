'use strict';

const usersService = require('../models/users');
const expenseService = require('../models/expenses');

const getAll = async(req, res) => {
  const filteredExpenses = await expenseService.getAllExpenses(req.query);

  res.send(filteredExpenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const foundExpense = await expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = await create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const update = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(404);
  }

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundExpense, req.body);

  res.send(foundExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

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
