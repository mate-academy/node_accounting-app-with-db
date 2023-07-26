'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getExpenseById = async(request, response) => {
  const { expenseId } = request.params;

  if (!expenseId) {
    response
      .sendStatus(400);

    return;
  }

  const expense = await expensesService.getExpenseById(expenseId);

  if (!expense) {
    response
      .sendStatus(404);

    return;
  }

  const normalizedExpense = expensesService.normalize(expense);

  response
    .status(200)
    .send(normalizedExpense);
};

const getAllExpenses = async(request, response) => {
  const expenses = await expensesService.getAllExpenses(request.query);

  if (!expenses) {
    response
      .sendSatus(500);

    return;
  }

  const normalizedExpenses = expenses.map(expensesService.normalize);

  response
    .status(200)
    .send(normalizedExpenses);
};

const addExpense = async(request, response) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = request.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    response
      .sendStatus(400);

    return;
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    response
      .sendStatus(400);

    return;
  }

  const expense = await expensesService.addExpense(request.body);

  if (!expense) {
    response
      .sendSatus(500);

    return;
  }

  const normalizedExpense = expensesService.normalize(expense);

  response
    .status(201)
    .send(normalizedExpense);
};

const updateExpense = async(request, response) => {
  const { expenseId } = request.params;

  if (!expenseId) {
    response
      .sendStatus(400);

    return;
  }

  const expense = await expensesService.getExpenseById(expenseId);

  if (!expense) {
    response
      .sendStatus(404);

    return;
  }

  const {
    title,
    amount,
    category,
    note,
  } = request.body;

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

  const normalizedExpense = expensesService.normalize(expense);

  response
    .status(200)
    .send(normalizedExpense);
};

const deleteExpense = async(request, response) => {
  const { expenseId } = request.params;

  if (!expenseId) {
    response
      .sendStatus(400);

    return;
  }

  const isDeletedExpense = await expensesService.deleteExpense(expenseId);

  if (!isDeletedExpense) {
    response
      .sendStatus(404);

    return;
  }

  response
    .sendStatus(204);
};

module.exports = {
  getExpenseById,
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
