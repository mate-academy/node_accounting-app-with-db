'use strict';

const usersService = require('../services/users.js');
const expensesService = require('../services/expenses.js');

const getAll = async(req, res) => {
  try {
    const query = req.query;

    const expenses = await expensesService.getAll(query);

    res.send(
      expenses.map(expensesService.normalize)
    );
  } catch (error) {
    res.sendStatus(400);
  }
};

const getOne = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = await expensesService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(
      expensesService.normalize(foundExpense)
    );
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  try {
    const expense = req.body;

    const foundUser = await usersService.getById(expense.userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = await expensesService.create(expense);

    res.statusCode = 201;

    res.send(
      expensesService.normalize(newExpense)
    );
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = await expensesService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    await expensesService.remove(expenseId);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = await expensesService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const data = req.body;

    const updatedExpense = await expensesService.update({
      expenseId,
      data,
    });

    res.send(
      expensesService.normalize(updatedExpense)
    );
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
