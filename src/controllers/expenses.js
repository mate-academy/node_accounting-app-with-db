'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/users');

async function getOne(req, res) {
  const { expenseId } = req.params;
  const foundExpenses = await expensesService.getExpenseById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
}

async function getAll(req, res) {
  const expenses = await expensesService.getAllExpenses(req.query);

  res.send(expenses);
};

async function add(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.createExpense(req.body);

  res.status(201);
  res.send(newExpense);
};

async function remove(req, res) {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.removeExpense(expenseId);
  res.sendStatus(204);
};

async function update(req, res) {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.updateExpense(expenseId, req.body);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
