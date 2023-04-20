'use strict';

const usersServise = require('../services/users.js');
const expensesServise = require('../services/expenses.js');

const getAll = (req, res) => {
  try {
    const query = req.query;

    const expenses = expensesServise.getAll(query);

    res.send(expenses);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getOne = (req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expensesServise.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = (req, res) => {
  try {
    const expense = req.body;

    const foundUser = usersServise.getById(expense.userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expensesServise.create(expense);

    res.statusCode = 201;
    res.send(newExpense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = (req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expensesServise.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expensesServise.remove(expenseId);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = (req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expensesServise.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const data = req.body;

    const updatedExpense = expensesServise.update({
      expenseId,
      data,
    });

    res.send(updatedExpense);
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
