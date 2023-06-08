'use strict';

const { expensesService } = require('../services/expenses');
const { usersService } = require('../services/users');

const getAll = async(req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.status(200).send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(expenseId);

  return expense
    ? res.status(200).send(expense)
    : res
      .status(404)
      .send({ message: `Expense with id ${expenseId} not found` });
};

const add = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  const [user, expense] = await Promise.all([
    usersService.getById(userId),
    expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }),
  ]);

  if (!user) {
    return res.sendStatus(400);
  }

  res.status(201).send(expense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(expenseId);

  if (!expense) {
    return res
      .status(404).send({ message: `Expense with id ${expenseId} not found` });
  }

  await expensesService.removeById(expenseId);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(expenseId);

  if (!expense) {
    return res
      .status(404).send({ message: `Expense with id ${expenseId} not found` });
  }

  const {
    spentAt = expense.spentAt,
    title = expense.title,
    amount = expense.amount,
    category = expense.category,
    note = expense.note,
  } = req.body;

  await expensesService.update(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(200).send(expense);
};

module.exports = {
  expensesController: {
    getAll,
    getOne,
    add,
    remove,
    update,
  },
};
