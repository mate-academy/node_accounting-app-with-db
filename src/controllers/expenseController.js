'use strict';

const userServices = require('../services/userServices');
const expenseServices = require('../services/expenseServices');

async function getAllExpenses(req, res) {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const filteredExpenses = await expenseServices
    .getExpenses(userId, categories, from, to);

  res.send(filteredExpenses);
}

async function getExpenseByUserId(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = await expenseServices.getExpenseByUserId(userId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundExpense);
}

async function create(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = await userServices.getByUserId(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.send(newExpense);
}

async function remove(req, res) {
  const { id } = req.params;

  const isExpenseExist = await expenseServices.getExpenseById(id);

  if (!isExpenseExist) {
    res.sendStatus(404);

    return;
  }

  await expenseServices.remove(id);
  res.sendStatus(204);
}

async function update(req, res) {
  const { id } = req.params;

  const foundExpense = await expenseServices.getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expenseServices.update(foundExpense, req);

  res.status(200);
  res.send(foundExpense);
}

module.exports = {
  getAllExpenses,
  getExpenseByUserId,
  create,
  remove,
  update,
};
