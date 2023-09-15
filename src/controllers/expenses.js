'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = async(req, res) => {
  const { userId, categories, from, to } = req.query;
  let expenses = await expenseService.getAll();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((expense) =>
      categories.includes(expense.category),
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

  res.status(200).send(expenses.map(expenseService.normalize));
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = await expenseService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expenseService.normalize(foundedExpense));
};

const add = async(req, res) => {
  const { spentAt, title, amount, category, note, userId } = req.body;

  if (!spentAt || !title || !amount || !category || !userId) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.create(
    user.id,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expenseService.normalize(newExpense));
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = await expenseService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const expenseData = req.body;

  const foundedExpense = expenseService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseService.update(expenseId, expenseData);

  const updatedExpense = await expenseService.getById(expenseId);

  res.status(200).send(expenseService.normalize(updatedExpense));
};

const expenseController = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports = expenseController;
