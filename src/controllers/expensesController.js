'use strict';

const expenseServices = require('../services/expenseServices');
const userServices = require('../services/userServices');

const getAll = async(req, res) => {
  try {
    const expenses = await expenseServices.getAllExpenses(req.query);

    res.status(200).send(expenses);
  } catch (error) {
    throw new Error(error);
  }
};

const createExpense = async(req, res) => {
  try {
    const { userId } = req.body;

    const user = await userServices.getUserById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

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
    throw new Error(error);
  }
};

const getExpense = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.status(404).message({ message: 'Expense Id not found' });

      return;
    }

    const foundExpense = await expenseServices.getExpenseById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  } catch (error) {
    throw new Error(error);
  }
};

const removeExpense = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.status(404).message({ message: 'Expense Id not found' });

      return;
    }

    const existingExpense = await expenseServices.getExpenseById(expenseId);

    if (!existingExpense) {
      res.sendStatus(404);

      return;
    }

    expenseServices.removeExpense(expenseId);

    res.sendStatus(204);
  } catch (error) {
    throw new Error(error);
  }
};

const updateExpense = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.status(404).message({ message: 'Expense Id not found' });

      return;
    }

    const existingExpense = await expenseServices.getExpenseById(expenseId);

    if (!existingExpense) {
      res.status(404).send({ message: 'Expanse not found' });

      return;
    };

    const updatedExpense = expenseServices.updateExpense(expenseId, req.body);

    res.send(updatedExpense);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAll,
  createExpense,
  getOneExpense: getExpense,
  removeExpense,
  updateExpense,
};
