'use strict';

const expensesService = require('../services/expensesService');
const userService = require('../services/usersService');

const getAllExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  if (userId && !(await userService.getUserById(parseInt(userId, 10)))) {
    return res.status(404).send('User not found');
  }

  const expenses = await expensesService.getExpenses({
    userId: userId ? Number(userId) : undefined,
    from,
    to,
    categories,
  });

  res.json(expenses);
};

const getExpense = async (req, res) => {
  const expense = await expensesService.getExpensesById(
    parseInt(req.params.id, 10),
  );

  if (expense === null) {
    return res.status(404).send('Expense not found');
  }

  res.json(expense);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userId === undefined || title === undefined || amount === undefined) {
    return res
      .status(400)
      .send(
        `Fields ${userId}, ${spentAt}, ${title}, ${amount}, ${category} is required`,
      );
  }

  if (!(await userService.getUserById(parseInt(userId, 10)))) {
    return res.status(400).send('User not found');
  }

  const expense = await expensesService.createExpense(
    Number(userId),
    spentAt ?? new Date(),
    title,
    amount,
    category ?? '',
    note ?? '',
  );

  res.status(201).json(expense);
};

const deleteExpense = async (req, res) => {
  const expense = await expensesService.getExpensesById(
    parseInt(req.params.id, 10),
  );

  if (expense === null) {
    return res.sendStatus(404);
  }

  await expensesService.deleteExpenseById(parseInt(req.params.id, 10));

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;

  const expense = await expensesService.getExpensesById(
    parseInt(req.params.id, 10),
  );

  if (expense === null) {
    return res.status(404).send('Expense not found');
  }

  const updatedExpense = await expensesService.updateExpenseById({
    id: parseInt(req.params.id, 10),
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.json(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
};
