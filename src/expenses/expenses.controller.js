'use strict';

const { expensesService } = require('./expenses.service');
const { usersService } = require('../users/users.service');

const getAllExpenses = (req, res) => {
  const { categories, userId, from, to } = req.query;
  let filteredResponse = [...expensesService.getExpenses()];

  if (categories) {
    filteredResponse = filteredResponse
      .filter(expense => expense.category === categories);
  }

  if (userId) {
    filteredResponse = filteredResponse
      .filter(expense => expense.userId === +userId);
  }

  if (from) {
    filteredResponse = filteredResponse
      .filter(expense => new Date(expense.spentAt) > new Date(from));
  }

  if (to) {
    filteredResponse = filteredResponse
      .filter(expense => new Date(expense.spentAt) < new Date(to));
  }

  res.send(filteredResponse);
};

const createNewExpense = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = await usersService.getUser(+userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  if (!(userId && spentAt && title && amount && category && note)) {
    res.sendStatus(404);

    return;
  }

  const expense = {
    id: Date.now(),
    userId: +userId,
    spentAt: spentAt,
    amount: +amount,
    title,
    category,
    note,
  };

  expensesService.addNewExpense(expense);
  res.statusCode = 201;

  res.send(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const index = expensesService.expenseIndex(id);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService
    .updateExpenseValues(index, spentAt, title, amount, category, note));
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expenseToSend = expensesService.getUserById(id);

  if (!expenseToSend) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseToSend);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const index = expensesService.expenseIndex(id);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOneExpense(index);

  res.sendStatus(204);
};

const expensesController = {
  getAllExpenses,
  createNewExpense,
  updateExpense,
  getExpenseById,
  deleteExpense,
};

module.exports = {
  expensesController,
};
