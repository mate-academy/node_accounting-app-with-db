'use strict';

const expensesServices = require('../services/expensesServices.js');
const userServices = require('../services/userServices.js');

const getAll = async(req, res) => {
  const expenses = await expensesServices.getAll(req.query);

  res.status(200).send(expensesServices.normalize(expenses));
};

const add = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId
    || !spentAt
    || !title
    || !amount
    || !category
    || !note
    || !userServices.getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesServices.createExpense(req.body);

  res.status(201).send(expensesServices.normalize(newExpense));
};

const getCurrentExpense = async(req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const currentExpense = await expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expensesServices.normalize(currentExpense));
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const currentExpense = await expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.removeExpense(expenseId);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const currentExpense = await expensesServices.getExpenseById(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.updateExpense(expenseId, req.body);

  const updatedExpense = await expensesServices.getExpenseById(expenseId);

  res.status(200).send(expensesServices.normalize(updatedExpense));
};

module.exports = {
  getAll,
  add,
  getCurrentExpense,
  remove,
  update,
};
