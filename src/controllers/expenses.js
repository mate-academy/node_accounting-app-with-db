'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = async(req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;
  let expenses = await expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt).getTime() > new Date(from).getTime()
    ));
  }

  if (to) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt).getTime() < new Date(to).getTime()
    ));
  }

  res.send(expenses);
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
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;
  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
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
