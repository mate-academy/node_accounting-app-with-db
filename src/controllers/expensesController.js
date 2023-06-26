/* eslint-disable camelcase */
'use strict';

const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

const getExpenses = async(req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = await Expense.findAll();

  if (userId) {
    expenses = expenses.filter(
      (expense) => expense.userId === Number(userId)
    );
  }

  if (categories) {
    const categoryArray = Array.isArray(categories)
      ? categories.forEach((category) => category.toLowerCase())
      : [categories.toLowerCase()];

    expenses = expenses.filter((expense) =>
      categoryArray.includes(expense.category.toLowerCase())
    );
  }

  if (from) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from)
    );
  }

  if (to) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to)
    );
  }

  res.json(expenses);
};

const getExpenseById = async(req, res) => {
  const { expenseId } = req.params;

  const requestedExpense = await Expense.findById(expenseId);

  if (!requestedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(requestedExpense);
};

const createExpense = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).send({ error: 'Missing required parameters' });
  }

  const requestedUser = await User.findById(userId);

  if (!requestedUser) {
    return res.status(400).send({ error: 'User not found' });
  }

  const expense = await Expense.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.status(201).json(expense);
};

const removeExpense = async(req, res) => {
  const { expenseId } = req.params;

  const requestedExpense = await Expense.findById(expenseId);

  if (!requestedExpense) {
    res.sendStatus(404);

    return;
  }

  await Expense.remove(expenseId);

  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const updates = req.body;

  const requestedExpense = await Expense.update(expenseId, updates);

  if (!requestedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(requestedExpense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
