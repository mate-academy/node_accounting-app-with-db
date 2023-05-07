'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getAll = async(req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);
  } else {
    res.send(foundExpense);
  }
};

const add = async(req, res) => {
  const { userId, title, spentAt, amount, category } = req.body;

  if (!userId || !title || !spentAt || !amount || !category) {
    return res.sendStatus(400);
  }

  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    return res.sendStatus(400);
  }

  const newExpense = await expensesService.create({
    ...req.body,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundUser = await expensesService.getById(expenseId);

  if (!foundUser) {
    return res.sendStatus(404);
  }

  await expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  await expensesService.update(expenseId, { ...req.body });

  const updatedExpense = await expensesService.getById(expenseId);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
