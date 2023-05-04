'use strict';

const expensesService = require('../services/expensesService.js');
const userService = require('../services/usersService.js');

const getAll = (req, res) => {
  const filteredExpenses = expensesService.getAll(req.query);

  res.statusCode = 200;
  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isUserExist = userService.getById(Number(userId));

  if (!title || !isUserExist) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const isExpenseRemoved = expensesService.remove(Number(expenseId));

  if (!isExpenseRemoved) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const updatedExpense = expensesService.update(Number(expenseId), req.body);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  const reqBodyKeys = Object.keys(req.body);

  if (!reqBodyKeys.length
    || reqBodyKeys.includes('id')
    || reqBodyKeys.includes('userId')
  ) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
