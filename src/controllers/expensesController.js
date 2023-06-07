'use strict';

const userService = require('../services/users.js');
const expensesService = require('../services/expenses.js');

const getAll = async(req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const expenseId = Number(req.params.expenseId);

  try {
    const foundedExpense = await expensesService.getById(expenseId);

    res.send(foundedExpense);
  } catch (error) {
    res.sendStatus(404);
  }
};

const createExpense = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userService.getUser(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.send(newExpense);
};

const remove = async(req, res) => {
  const expenseId = Number(req.params.expenseId);
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    userId = foundExpense.userId,
    spentAt = foundExpense.spentAt,
    title = foundExpense.title,
    amount = foundExpense.amount,
    category = foundExpense.category,
    note = foundExpense.note,
  } = req.body;

  if (!userService.getUser(userId)) {
    res.sendStatus(400);

    return;
  }

  await expensesService.update({
    id: expenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpense);
};

module.exports = {
  getAll,
  remove,
  update,
  createExpense,
  getOne,
};
