'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expenseService
    .getExpenses(userId, categories, from, to);

  res.send(expenses.map(expenseService.normalize));
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(422);

    return;
  }

  const foundExpense = await expenseService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseService.normalize(foundExpense));
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

  const foundUser = await userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const dataIsNotValid = !spentAt
  || !title
  || isNaN(+amount)
  || !category
  || !note;

  if (dataIsNotValid) {
    res.sendStatus(400);
  }

  const newExpense = expenseService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.status(201);
  res.send(expenseService.normalize(newExpense));
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpense(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const dataToUpdate = req.body;
  const foundExpense = await expenseService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.updateExpense({
    id: expenseId,
    dataToUpdate,
  });

  res.send(expenseService.normalize(foundExpense));
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
