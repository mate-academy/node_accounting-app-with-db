'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const create = async(req, res) => {
  const { title, userId } = req.body;
  const foundUser = await usersService.getById(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.create(req.body);

  res.statusCode = 201;
  res.send(expense);
};

const getAll = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  let expenses = await expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) >= new Date(from)
    ));
  }

  if (to) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) <= new Date(to)
    ));
  }

  res.send(expenses);
};

const getById = async(req, res) => {
  const foundExpense = await expensesService.getById(req.params.expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
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

  const updatedExpense = await expensesService.update(expenseId, req.body);

  res.send(updatedExpense);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
