'use strict';

const { getUser } = require('../users/services');
const expensesServices = require('./services');

module.exports.createExpense = async(req, res) => {
  const expense = req.body;

  const user = await getUser(expense.userId);

  if (!expense.title || !user) {
    res.sendStatus(400);

    return;
  }

  const createdExpanse = await expensesServices.createExpenses(expense);

  res.statusCode = 201;

  res.send(createdExpanse);
};

module.exports.getExpenses = async(req, res) => {
  const {
    userId,
    from,
    to,
    category,
  } = req.query;

  const foundExpenses = await expensesServices
    .getExpenses(+userId, from, to, category);

  res.send(foundExpenses);
};

module.exports.getExpense = async(req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expensesServices.getExpense(numId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

module.exports.deleteExpense = async(req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  try {
    await expensesServices.deleteExpense(numId);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

module.exports.updateExpense = async(req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  const body = req.body;

  try {
    const newExpense = await expensesServices.updateExpense(numId, body);

    res.send(newExpense);
  } catch (err) {
    res.sendStatus(404);
  }
};
