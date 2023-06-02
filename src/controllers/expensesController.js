'use strict';

const {
  getAll,
  getById,
  create,
  changeById,
  deleteById,
} = require('../models/expenses');

const { getById: getUserById } = require('../models/users');

const getAllExpenses = async(req, res) => {
  const expenses = await getAll(req.query);

  res.send(expenses);
};

const getOneExpense = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = await getById(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  return res.send(expense);
};

const createExpense = async(req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  const user = await getUserById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = await create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return res.status(201).send(newExpense);
};

const changeExpense = async(req, res) => {
  const { expenseId } = req.params;

  const expenseIdNumber = Number(expenseId);

  if (!expenseIdNumber) {
    return res.sendStatus(404);
  }

  const expense = await getById(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await changeById(expenseIdNumber, {
    ...req.body,
  });

  return res.send(updatedExpense);
};

const deleteExpense = async(req, res) => {
  const { expenseId } = req.params;

  const expenseIdNumber = Number(expenseId);

  if (!expenseIdNumber) {
    return res.sendStatus(400);
  }

  const expense = await getById(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  await deleteById(expenseIdNumber);

  return res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  changeExpense,
  deleteExpense,
};
