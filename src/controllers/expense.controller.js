'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = async (req, res) => {
  const expenses = await expenseService.getAll();

  res.json(expenses);
};

const create = async (req, res) => {
  const { title, amount, userId } = req.body;

  if (!title || !amount || !userId) {
    return res.status(400).send('Title/Amount/UserId are required');
  }

  try {
    const user = await userService.getById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const expense = await expenseService.create(title, amount, userId);

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).send('Error creating expense');
  }
};

module.exports = {
  getAll,
  create,
};
