'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const getAllFiltered = async(req, res) => {
  const filteredExpenses = await expensesService.getFilteredExpenses(req.query);

  res.send(filteredExpenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.findById(Number(expenseId));

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

  const foundUser = await userService.findById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.findById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(Number(expenseId));
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.findById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const expense = await expensesService.update({
    id: Number(expenseId), ...req.body,
  });

  res.send(expense);
};

module.exports = {
  getAllFiltered,
  getOne,
  add,
  remove,
  update,
};
