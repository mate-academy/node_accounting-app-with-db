'use strict';

const expenseServices = require('../services/expenseServices');
const userServices = require('../services/userServices');

const getAll = async(req, res) => {
  try {
    const expenses = await expenseServices.getAllExpenses(req.query);

    res.status(200).send(expenses);
  } catch (error) {
    res.sendStatus(400);
  }
};

const createExpense = async(req, res) => {
  try {
    const { userId } = req.body;

    const user = await userServices.getUserById(Number(userId));

    if (!user) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const isValidRequest = expenseServices.validateData(req.body);

    if (!isValidRequest) {
      res.status(422).send({ message: 'Validation error' });

      return;
    }

    const newExpense = await expenseServices.create(req.body);

    res.status(201).send(newExpense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getOneExpense = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(404);

      return;
    }

    const foundExpense = await expenseServices
      .getExpenseById(Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }
    res.send(foundExpense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const removeExpense = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(404);

      return;
    }

    await expenseServices.removeExpense(Number(expenseId));

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

const updateExpense = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.sendStatus(404);

      return;
    }

    const existingExpense = await expenseServices
      .getExpenseById(Number(expenseId));

    if (!existingExpense) {
      res
        .status(404)
        .send({ message: 'Expense not found' });

      return;
    }

    const updatedExpense = await expenseServices
      .updateExpense(Number(expenseId), req.body);

    res.send(updatedExpense);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  createExpense,
  getOneExpense,
  removeExpense,
  updateExpense,
};
