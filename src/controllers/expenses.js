'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = async(req, res) => {
  const {
    userId, category, from, to,
  } = req.query;

  const expenses = await expenseService.getAll(userId, category, from, to);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !title || !spentAt || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { title } = req.body;

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = await expenseService.update({
    title,
    id: expenseId,
  });

  res.send(updatedExpense[1]);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
