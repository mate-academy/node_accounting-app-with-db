'use strict';

const expenseService = require('../services/expenses');
const { getById: getUserById } = require('../services/users');

const getAll = async(req, res) => {
  const { userId, category, from, to } = req.query;

  try {
    const foundExpenses = await expenseService
      .getAll(userId, category, from, to);

    res.send(
      foundExpenses.map(expenseService.normalize)
    );
  } catch (err) {
    throw new Error(err);
  }
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  try {
    const foundExpense = await expenseService.getById(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(
      expenseService.normalize(foundExpense)
    );
  } catch (err) {
    throw new Error(err);
  }
};

const add = async(req, res) => {
  const newExpense = req.body;
  const { userId, title, amount, category } = newExpense;

  try {
    const foundUser = await getUserById(userId);
    const check = !title || !amount || !category || !foundUser;

    if (check) {
      res.sendStatus(400);

      return;
    }

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

  try {
    const foundExpense = await expenseService.getById(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    await expenseService.remove(id);
  } catch (err) {
    throw new Error(err);
  }

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  try {
    const foundExpense = await expenseService.getById(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }
    await expenseService.update(id, updateData);

    res.send(
      expenseService.normalize(foundExpense)
    );
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
