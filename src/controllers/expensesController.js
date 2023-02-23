'use strict';

const expenseService = require('../services/expencesServices');
const userService = require('../services/usersServices');

async function getAll(req, res) {
  const searchParams = req.query;

  const expenses = await expenseService.getAll(searchParams);

  res.send(
    expenses.map(expenseService.normalize)
  );
}

async function getById(req, res) {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseService.normalize(foundExpense));
}

async function create(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;
  const expenseData = req.body;

  const foundUser = await userService.findById(userId);

  const isDataInvalid = typeof userId !== 'string'
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || !foundUser;

  if (isDataInvalid) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create(expenseData);

  res.statusCode = 201;
  res.send(expenseService.normalize(newExpense));
}

async function remove(req, res) {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(expenseId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const expenseData = req.body;

  const updatedExpense = await expenseService
    .update(expenseId, expenseData);

  res.send(expenseService.normalize(updatedExpense));
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
