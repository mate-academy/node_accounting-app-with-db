'use strict';

const expensesService = require('../service/expenses');
const userService = require('../service/users');

const getAll = async(req, res) => {
  const expenses = await expensesService.getAll({
    ...req.query,
  });

  res.status(200).send(expenses);
};

const getById = async(req, res) => {
  const { expenseId } = req.params;

  const expense = await expensesService.getById(Number(expenseId));

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const add = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = await userService.getById(userId);

  if (!user || !userId || !spentAt || !title || !amount
    || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.add({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const update = async(req, res) => {
  const { expenseId } = req.params;

  const expenseIdNumber = Number(expenseId);

  const expense = await expensesService.getById(expenseIdNumber);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.update(
    expenseIdNumber,
    req.body,
  );

  res.status(200).send(expense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  const expenseIdNumber = Number(expenseId);

  const expense = await expensesService.getById(expenseIdNumber);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseIdNumber);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};
