'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = async(req, res) => {
  const queryParams = req.query;

  const filteredExpenses = await expenseService.getAll(queryParams);

  res.send(filteredExpenses);
};

const getOne = async(req, res) => {
  try {
    const { expenseId } = req.params;

    const foundExpense = await expenseService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    };

    res.send(foundExpense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  try {
    const data = req.body;

    const hasUser = await userService.getById(data.userId);

    if (!hasUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = await expenseService.create(data);

    res.status(201);
    res.send(newExpense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = async(req, res) => {
  try {
    const { expenseId } = req.params;

    const foundExpense = await expenseService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    await expenseService.remove(expenseId);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  try {
    const { expenseId } = req.params;

    const foundExpense = await expenseService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    };

    const data = req.body;

    await expenseService.update(expenseId, data);

    const expense = await expenseService.getById(expenseId);

    res.send(expense);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
