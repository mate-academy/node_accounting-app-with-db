'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getAll = async(req, res) => {
  const filteredExpenses = await expensesService.getFilteredExpenses(req.query);

  res.send(filteredExpenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.findById(parseInt(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
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

  const foundUser = await usersService.findById(parseInt(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create(req.body);

  res.status(201).send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.findById(parseInt(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(parseInt(expenseId));
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.findById(parseInt(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const expense = await expensesService.update({
    id: parseInt(expenseId), ...req.body,
  });

  res.send(expense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
