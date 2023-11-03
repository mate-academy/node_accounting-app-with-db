'use strict';

const { expensesService } = require('./expenses.service');
const { usersService } = require('../users/users.service');

const getAllExpenses = async(req, res) => {
  const { categories, userId, from, to } = req.query;
  let filteredResponse = [...await expensesService.getExpenses()];

  if (categories) {
    filteredResponse = filteredResponse
      .filter(expense => expense.category === categories);
  }

  if (userId) {
    filteredResponse = filteredResponse
      .filter(expense => expense.userId === userId);
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

  if (!(userId && spentAt && title && amount && category && note)) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getUser(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category,
    note: note,
  };

  const expense = await expensesService.addNewExpense(newExpense);

  res.status(201).send(expense);
};

const updateExpense = async(req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (spentAt) {
    expense.spentAt = spentAt;
  }

  if (title) {
    expense.title = title;
  }

  if (amount) {
    expense.amount = amount;
  }

  if (category) {
    expense.category = category;
  }

  if (note) {
    expense.note = note;
  }

  await expensesService.updateExpenseValues(
    id,
    expense.spentAt,
    expense.title,
    expense.amount,
    expense.category,
    expense.note);
  res.send(expense);
};

const getExpenseById = async(req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const deleteExpense = async(req, res) => {
  const { id } = req.params;
  const expenseToDelete = await expensesService.getExpenseById(id);

  if (expenseToDelete) {
    await expensesService.deleteOneExpense(id);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
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
