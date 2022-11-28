'use strict';

const { getUserById } = require('../services/users');

const {
  getFilteredExpenses,
  getExpenses,
  addExpense,
  getOneExpense,
  deleteExpense,
  changeExpense,
} = require('../services/expenses');

const getAllExpenses = async(req, res) => {
  if (Object.entries(req.query).length) {
    res.send(await getFilteredExpenses(req.query));

    return;
  }

  res.send(await getExpenses());
};

const createExpense = async(req, res) => {
  const foundedUser = await getUserById(+req.body.userId);

  if (!foundedUser) {
    res.sendStatus(400);

    return +req.body.userId;
  }

  res.statusCode = 201;
  res.send(await addExpense(req.body));
};

const getExpense = async(req, res) => {
  const { expenseId } = req.params;

  const foundedExpense = await getOneExpense(+expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpense);
};

const removeExpense = async(req, res) => {
  const { expenseId } = req.params;

  const foundedExpense = await getOneExpense(+expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  await deleteExpense(+expenseId);
  res.sendStatus(204);
};

const modifyExpense = async(req, res) => {
  const { expenseId } = req.params;

  const foundedExpense = await getOneExpense(+expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  res.send(await changeExpense(+expenseId, req.body));
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  modifyExpense,
};
