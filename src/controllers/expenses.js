'use strict';

const expensesServices = require('../services/expenses');
const userServices = require('../services/users');

async function getAll(req, res) {
  const getQuery = req.query;
  const expenses = await expensesServices.getAll(getQuery);

  res.send(expenses);
}

async function getOne(req, res) {
  const { expensesId } = req.params;

  const foundExpenses = await expensesServices.getById(expensesId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
}

async function addNew(req, res) {
  const { userId, title, amount, category, note } = req.body;
  const user = await userServices.getById(userId);

  if (!user || !userId || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newUser = await expensesServices.addNew({
    userId,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newUser);
}

async function remove(req, res) {
  const { expensesId } = req.params;

  const foundUser = await expensesServices.getById(expensesId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.remove(expensesId);
  res.sendStatus(204);
}

async function change(req, res) {
  const { expensesId } = req.params;
  const foundExpenses = await expensesServices.getById(expensesId);

  const newParams = req.body;

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.change(expensesId, newParams);

  const newfoundExpenses = await expensesServices.getById(expensesId);

  res.send(newfoundExpenses);
}

module.exports = {
  getOne,
  getAll,
  addNew,
  change,
  remove,
};
