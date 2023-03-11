'use strict';

const userService = require('../services/users.js');
const expenseService = require('../services/expenses.js');

const getAll = async(req, res) => {
  const query = req.query;

  try {
    const expenses = await expenseService.getAllByQuery(query);

    res.send(expenses);
  } catch (error) {
    res.send(400);
  }
};

const getOne = async(req, res) => {
  const { expensesId } = req.params;

  try {
    const expense = await expenseService.getById(expensesId);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  const data = req.body;

  try {
    const isUser = userService.getById(data.userId);

    if (!isUser) {
      res.sendStatus(400);

      return;
    }

    const newExpenses = await expenseService.create(data);

    res.statusCode = 201;
    res.send(newExpenses);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  const { expensesId } = req.params;
  const data = req.body;

  try {
    const foundExpense = await expenseService.getById(expensesId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    await expenseService.update(expensesId, data);

    const updatedExpanse = await expenseService.getById(expensesId);

    res.send(updatedExpanse);
  } catch (error) {
    res.send(400);
  }
};

const remove = async(req, res) => {
  const { expensesId } = req.params;

  try {
    const foundExpense = await expenseService.getById(expensesId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    await expenseService.remove(expensesId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
