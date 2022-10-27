'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAllExpenses = async(req, res) => {
  const { userId, category, from, to } = req.query;
  const expenses = await expenseService.getAll();

  const foundUser = await userService.getById(userId);

  if (foundUser) {
    let userExpenses = expenses.filter(expense => expense.userId === userId);

    if (category) {
      userExpenses = userExpenses
        .filter(expense => expense.category === category);
    }
    res.send(userExpenses);

    return;
  }

  if (from && to) {
    const expensesByDate = expenses.filter(
      expense => (expense.spentAt >= from && expense.spentAt <= to)
    );

    res.send(expensesByDate);

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
};

const getExpense = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const addExpense = async(req, res) => {
  const { userId, title, amount, category, note } = req.body;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  };

  const newExpense = await expenseService.add(
    userId,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(+expenseId);
  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.update(expenseId, { title });

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
