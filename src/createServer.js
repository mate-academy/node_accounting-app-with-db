'use strict';

const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // Users

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('User name is required');
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.get('/users/:userId', async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  });

  app.patch('/users/:userId', async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    await user.update({ name });

    res.json(user);
  });

  app.delete('/users/:userId', async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    await user.destroy();

    res.sendStatus(204);
  });

  // Expenses

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const where = {};

    if (userId) {
      where.userId = parseInt(userId, 10);
    }

    const catArr = Array.isArray(categories)
      ? categories
      : categories
        ? [categories]
        : [];

    if (catArr.length) {
      where.category = catArr;
    }

    if (from) {
      where.spentAt = { ...where.spentAt, [Op.gte]: new Date(from) };
    }

    if (to) {
      where.spentAt = { ...where.spentAt, [Op.lte]: new Date(to) };
    }

    const expenses = await Expense.findAll({ where });

    res.json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      return res.status(400).send('Missing required expense fields');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  });

  app.get('/expenses/:expenseId', async (req, res) => {
    const expense = await Expense.findByPk(req.params.expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.json(expense);
  });

  app.patch('/expenses/:expenseId', async (req, res) => {
    const expense = await Expense.findByPk(req.params.expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    const { spentAt, title, amount, category, note } = req.body;

    await expense.update({
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.json(expense);
  });

  app.delete('/expenses/:expenseId', async (req, res) => {
    const expense = await Expense.findByPk(req.params.expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await expense.destroy();

    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
