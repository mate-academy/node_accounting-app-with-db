'use strict';

const expenseService = require('../services/expenses.service');
const { getUserById } = require('../services/user.service');

const getExpenses = async(req, res) => {
  const { userId, from, to, categories } = req.query;
  let expenses = await expenseService.getAll();

  if (userId) {
    expenses = expenses.filter(
      expense => expense.userId === +userId
    );
  }

  if (from && to) {
    expenses = expenses.filter((expense) => {
      const normalizedExpenseDate = new Date(expense.spentAt);
      const normalizedDateFrom = new Date(from);
      const normalizedDateTo = new Date(to);

      return (
        normalizedExpenseDate >= normalizedDateFrom
        && normalizedExpenseDate <= normalizedDateTo
      );
    });
  }

  if (categories) {
    expenses = expenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  res.status(200).send(expenses.map(expenseService.normalize));
};

const getExpense = async(req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expenseService.normalize(expense));
};

const createExpense = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const idForUser = +userId;

  const userById = await getUserById(idForUser);

  if (!userById && userId) {
    res.sendStatus(400);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  await expenseService.clearExpense(newExpense);

  res.status(201).send(expenseService.normalize(newExpense));
};

const deleteExpense = async(req, res) => {
  const { id } = req.params;
  const expenseById = await expenseService.getById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(id);

  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const expenseToUpdate = req.body;

  await expenseService.update(id, expenseToUpdate);

  res.status(200).send(expenseService.normalize(expense));
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
