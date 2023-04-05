'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = async(req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  if (userId) {
    if (!Number.isInteger(+userId)) {
      res.sendStatus(422);

      return;
    }
  }

  if (categories) {
    const isCategoriesValid = typeof categories === 'string'
      || Array.isArray(categories);

    if (!isCategoriesValid) {
      res.sendStatus(422);

      return;
    }
  }

  const expenses = await expenseService.getAll(userId, categories, from, to);

  res.send(
    expenses.map(expenseService.normalize)
  );
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(
    expenseService.normalize(foundExpense)
  );
};

const create = async(req, res) => {
  const expense = req.body;
  const { userId } = expense;
  const foundUser = await userService.getById(userId);

  if (Object.keys(expense).length < 6 || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create(expense);

  res.statusCode = 201;

  res.send(
    expenseService.normalize(newExpense)
  );
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

  const data = req.body;

  await expenseService.update({
    expenseId,
    data,
  });

  const updatedExpense = await expenseService.getById(expenseId);

  res.send(
    expenseService.normalize(updatedExpense)
  );
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
