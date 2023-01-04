'use strict';

const expenseService = require('../services/expenses');
const { getById: getUserById } = require('../services/users');

const getAll = async(req, res) => {
  const { userId, category, from, to } = req.query;
  const foundExpenses = await expenseService.getAll(userId, category, from, to);

  res.send(
    foundExpenses.map(expenseService.normalize)
  );
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(
    expenseService.normalize(foundExpense)
  );
};

const add = async(req, res) => {
  const newExpense = req.body;
  const { userId, title, amount, category } = newExpense;
  const foundUser = await getUserById(userId);
  const check = !title || !amount || !category || !foundUser;

  if (check) {
    res.sendStatus(400);

    return;
  }

  try {
    await expenseService.create(newExpense);
  } catch (err) {
    throw new Error(err);
  }

  res.statusCode = 201;

  res.send(
    expenseService.normalize(newExpense)
  );
};

const remove = async(req, res) => {
  const { id } = req.params;
  const foundExpense = await expenseService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  try {
    await expenseService.update(id, updateData);
  } catch (err) {
    throw new Error(err);
  }

  res.send(
    expenseService.normalize(foundExpense)
  );
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
