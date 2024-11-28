/* eslint-disable no-console */
const expensesService = require('../services/expenses.service');

const getExpenses = async (req, res) => {
  const query = req.query;

  try {
    if (Object.keys(query).length > 0) {
      const filteredExpenses = await expensesService.getExpenseByQuery(query);

      res.status(200).json(filteredExpenses);

      return;
    }

    const expenses = await expensesService.getAllExpenses();

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: 'Expense ID is required',
      });
    }

    const expense = await expensesService.getExpenseById(id);

    res.json(expense);
  } catch (error) {
    if (error.message === 'Expense not found') {
      res.status(404).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

const createNewExpense = async (req, res) => {
  console.log('body: r,', req.body);

  try {
    const requiredKeys = ['spentAt', 'title', 'amount', 'userId'];

    const passedKeys = Object.keys(req.body);

    const hasAllKeys = requiredKeys.every((key) => passedKeys.includes(key));

    if (!hasAllKeys) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const createdExpense = await expensesService.createExpense(req.body);

    res.status(201).json(createdExpense);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: 'Expense ID is required',
      });

      return;
    }

    const expense = req.body;

    const updatedExpense = await expensesService.updateExpense(id, expense);

    res.status(200).json(updatedExpense);
  } catch (error) {
    if (error.message === 'Expense not found') {
      res.status(404).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

const removeExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: 'Expense ID is required',
      });

      return;
    }

    await expensesService.deleteExpense(id);

    res.status(204).end();
  } catch (error) {
    if (error.message === 'Expense not found') {
      res.status(404).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getExpenses,
  getExpense,
  createNewExpense,
  updateExpense,
  removeExpense,
};
