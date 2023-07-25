'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getAll = async(req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  const expenses = await expensesService.getAll({
    userId,
    from,
    to,
    categories,
  });

  res.send(
    expenses.map(expensesService.normalize)
  );
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = async(req, res) => {
  const {
    userId,
    title,
    amount,
    category,
  } = req.body;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !title || !amount || !category) {
    res.sendStatus(422);

    return;
  }

  const newExpense = await expensesService.create(req.body);

  res.statusCode = 201;

  res.send(
    expensesService.normalize(newExpense)
  );
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.update({
    id: expenseId, ...req.body,
  });

  res.send(
    expensesService.normalize(updatedExpense)
  );
};

module.exports = {
  getAll, getOne, add, remove, update,
};
