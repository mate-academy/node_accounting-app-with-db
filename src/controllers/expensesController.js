'use strict';

const usersService = require('../services/usersService');
const expensesService = require('../services/expensesService');

const getAll = async(req, res) => {
  const expenses = await expensesService.getAllExpenses(req.query);

  res.json(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    amount,
    title,
    category,
    note,
  } = req.body;

  if (!userId || !title || !spentAt || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.createExpense({
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.removeExpense(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.updateExpense(
    expenseId,
    { ...req.body },
  );

  const updatedExpense = await expensesService.getExpenseById(expenseId);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
