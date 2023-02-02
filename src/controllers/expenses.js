'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/users');
const { normalize } = require('../services/expenses');

const getAll = async(req, res) => {
  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

  const { userId, from, to } = Object.fromEntries(normalizedURL.searchParams);

  const categories = normalizedURL.searchParams.getAll('category');

  const expenses = await expensesService.getAll(
    userId,
    categories,
    from,
    to
  );

  res.send(expenses.map(normalize));
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundExpense = await expensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(normalize(foundExpense));
};

const change = async(req, res) => {
  const { id } = req.params;
  const foundExpense = await expensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { title } = req.body;

  if (typeof title !== 'string') {
    res.sendStatus(422);

    return;
  }

  await expensesService.update(id, title);

  const updatedExpense = await expensesService.getById(id);

  res.send(normalize(updatedExpense));
};

const create = async(req, res) => {
  const { userId } = req.body;
  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create(req.body);

  res.status(201);
  res.send(normalize(newExpense));
};

const remove = async(req, res) => {
  const { id } = req.params;
  const foundExpense = await expensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  change,
  remove,
};
