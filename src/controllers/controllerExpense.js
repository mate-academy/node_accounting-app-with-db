'use strict';

const expenseService = require('../services/serviceExpenses');
const userService = require('../services/serviceUsers');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = await expenseService.getAllExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.json(expenses);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getExpenseById(id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.json(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || amount === undefined) {
    return res
      .status(400)
      .send(
        'All fields are required: userId, spentAt, title, amount, category',
      );
  }

  const user = await userService.getUserById(Number(userId));

  if (!user) {
    return res.status(404).send('User not found');
  }

  const expense = await expenseService.createExpense(
    Number(userId),
    spentAt,
    title,
    Number(amount),
    category || '',
    note,
  );

  res.status(201).json(expense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const expense = await expenseService.updateExpense(id, updates);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.json(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await expenseService.deleteExpense(id);

  if (!deleted) {
    return res.status(404).send('Expense not found');
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
