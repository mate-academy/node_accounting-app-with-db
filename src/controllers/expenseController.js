/* eslint-disable no-console */
'use strict';

const { ExpenseService } = require('../services/expenseService');
const expenseService = new ExpenseService();
const { Op } = require('sequelize');
const userService = require('../services/userService');

async function createExpense(req, res) {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!spentAt || !title || !amount || !userId) {
      return res.status(400).send('All fields are required');
    }

    const user = await userService.getAllUsers({ id: userId });

    if (user.length === 0) {
      return res.status(400).send('Bad Request');
    }

    const newExpense = await expenseService.createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating expense');
  }
}

async function getAllExpenses(req, res) {
  try {
    const { userId, categories: category, from, to } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (category) {
      where.category = category;
    }

    if (from && to) {
      where.spentAt = {
        [Op.between]: [new Date(from), new Date(to)],
      };
    }

    const expenses = await expenseService.getAllExpenses(where);

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting expenses');
  }
}

async function getExpense(req, res) {
  try {
    const [expense] = await expenseService.getAllExpenses({
      id: parseInt(req.params.id),
    });

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting expense');
  }
}

async function updateExpense(req, res) {
  try {
    const expense = await expenseService.updateExpense(
      parseInt(req.params.id),
      req.body,
    );

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating expense');
  }
}

async function deleteExpense(req, res) {
  try {
    const success = await expenseService.deleteExpense(parseInt(req.params.id));

    if (!success) {
      return res.status(404).send('Expense not found');
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting expense');
  }
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
