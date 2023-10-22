'use strict';

const expenseService = require('../service/expenses.services');
const usersService = require('../service/users.services');

const getFilteredExpenses = async(req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses(req.query);

    res.send(expenses);
  } catch (error) {
    res.status(500).send('An error occurred while fetching expenses.');
  }
};

const getOneExpense = async(req, res) => {
  try {
    const { expenseId } = req.params;

    if (!expenseId) {
      res.status(400).send('Data Not Found');

      return;
    }

    const foundExpense = await expenseService.getExpenseById(expenseId);

    if (!foundExpense) {
      res.status(404).send('Expense Not Found');

      return;
    }

    res.send(foundExpense);
  } catch (error) {
    res.status(500).send('An error occurred while fetching the expense.');
  }
};

const createExpense = async(req, res) => {
  try {
    const {
      userId,
      title,
      spentAt,
      amount,
      category,
    } = req.body;

    if (!userId || !title || !spentAt || !amount || !category) {
      res.status(400).send('Not all data is provided');

      return;
    }

    const foundUser = await usersService.getUserById(userId);

    if (!foundUser) {
      res.status(400).send('User Not Found');

      return;
    }

    const newExpense = await expenseService.createExpense(req.body);

    res.status(201).send(newExpense);
  } catch (error) {
    res.status(500).send('An error occurred while creating the expense.');
  }
};

const removeExpense = async(req, res) => {
  try {
    const { expenseId } = req.params;
    const foundExpense = await expenseService.getExpenseById(expenseId);

    if (!foundExpense) {
      res.status(404).send('Expense Not Found');

      return;
    }

    await expenseService.removeExpense(expenseId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('An error occurred while removing the expense.');
  }
};

const updateExpense = async(req, res) => {
  try {
    const { expenseId } = req.params;
    const foundExpense = await expenseService.getExpenseById(expenseId);

    if (!foundExpense) {
      res.status(404).send('Expense Not Found');

      return;
    }

    const updateData = { ...req.body };

    await expenseService.updateExpense(expenseId, updateData);
    res.send(foundExpense);
  } catch (error) {
    res.status(500).send('An error occurred while updating the expense.');
  }
};

module.exports = {
  getFilteredExpenses,
  getOneExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
