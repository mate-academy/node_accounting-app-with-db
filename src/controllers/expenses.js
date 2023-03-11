'use strict';

const userService = require('../services/users.js');
const expenseService = require('../services/expenses.js');

const getAll = async(req, res) => {
  const query = req.query;

  try {
    const expenses = await expenseService.getAllByQuery(query);

    res.send(expenses);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;

  try {
    const expense = await expenseService.getById(expenseId);

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
    const user = userService.getById(data.userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const newExpense = await expenseService.create(data);

    res.statusCode = 201;
    res.send(newExpense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const data = req.body;

  try {
    const foundExpense = await expenseService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    await expenseService.update(expenseId, data);

    const updatedExpanse = await expenseService.getById(expenseId);

    res.send(updatedExpanse);
  } catch (error) {
    res.send(400);
  }
};

const remove = async(req, res) => {
  const { expenseId } = req.params;

  try {
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

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
