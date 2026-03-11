'use strict';

const expenseService = require('../services/expenseService');
const userService = require('../services/userService');

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  // eslint-disable-next-line
  const expenses = await expenseService.getAll({
    userId,
    categories,
    from,
    to,
  });

  res.json(expenses);
};

const getExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expense);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || amount === undefined) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  const user = await userService.getById(Number(userId));

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const expense = await expenseService.create({
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const updateExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expenseService.update(id, req.body);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expense);
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await expenseService.remove(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
