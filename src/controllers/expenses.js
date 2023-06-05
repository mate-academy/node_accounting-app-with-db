'use strict';

const expensesService = require('../models/expenses.js');
const usersService = require('../models/users.js');

const getExpenses = async(req, res) => {
  const filtredEcpenses = await expensesService.getExpenses(req.query);

  res.send(filtredEcpenses);
};

const getExpenseById = async(req, res) => {
  const { expensesId } = req.params;

  const foundExpense = await expensesService.getExpenseById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = async(req, res) => {
  const { userId } = req.body;

  const bodyProps = Object.values(req.body);
  const isRequireValid = bodyProps.every((prop) => prop);

  const foundUser = usersService.getUserById(userId);

  if (!isRequireValid || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.createExpense(req.body);

  res.statusCode = 201;

  res.send(newExpense);
};

const removeExpense = async(req, res) => {
  const { expensesId } = req.params;

  const foundExpense = await expensesService.getExpenseById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.removeExpense(expensesId);
  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expensesId } = req.params;

  const foundExpense = await expensesService.getExpenseById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.updateExpense({
    expensesId,
    data: req.body,
  });

  res.send(updatedExpense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
};
