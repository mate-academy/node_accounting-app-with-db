'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAll = async(req, res) => {
  const filteredExpenses = await expenseService.getExpenses(req.query);

  res.send(filteredExpenses);
};

const getById = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(foundExpense);
};

const addExpense = async(req, res) => {
  const { userId } = req.body;

  const bodyProps = Object.values(req.body);
  const isRequireValid = bodyProps.every((prop) => prop);

  const foundUser = userService.getById(userId);

  if (!isRequireValid || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expenseService.addExpense(req.body);

  res.status(200);
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  const foundExpenses = await expenseService.getById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  await expenseService.remove(expenseId);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const body = req.body;

  const foundExpense = await expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updateExpense = await expenseService.update({
    id: expenseId,
    body,
  });

  res.status(200);
  res.send(updateExpense);
};

module.exports = {
  getAll,
  getById,
  addExpense,
  remove,
  update,
};
