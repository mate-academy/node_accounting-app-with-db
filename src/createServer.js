'use strict';

const express = require('express');
const { sequelize } = require('./db');
const { Op } = require('sequelize');

const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Category } = require('./models/Category.model');

const createServer = () => {
  // your code goes here
  const app = express();

  app.use(express.json());

  sequelize.sync();

  // ==================== USERS ====================
  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('A more descriptive message');
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    await user.destroy();
    res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).send('User not found');
    }

    await user.update(req.body);
    res.json(user);
  });

  // ==================== EXPENSES ====================

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (categories) {
      where.category = {
        [Op.in]: Array.isArray(categories) ? categories : [categories],
      };
    }

    if (from || to) {
      where.spentAt = {};

      if (from) {
        where.spentAt[Op.gte] = new Date(from);
      }

      if (to) {
        where.spentAt[Op.lte] = new Date(to);
      }
    }

    const expenses = await Expense.findAll({ where });

    res.json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (title === undefined || userId === undefined || amount === undefined) {
      return res
        .status(400)
        .send('Missing required fields: userId, title, amount');
    }

    const userExists = await User.findByPk(Number(userId));

    if (!userExists) {
      return res.status(400).send('User not found');
    }

    const expense = await Expense.create({
      userId,
      spentAt: spentAt || new Date(),
      title,
      amount,
      category: category || '',
      note: note !== undefined ? note : '',
    });

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await expense.update(req.body);
    res.json(expense);
  });

  // ==================== CATEGORIES ====================
  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.json(categories);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('A more descriptive message');
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  });

  app.get('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(Number(req.params.id));

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(Number(req.params.id));

    if (!category) {
      return res.status(404).send('Category not found');
    }

    await category.destroy();
    res.sendStatus(204);
  });

  app.patch('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(Number(req.params.id));

    if (!category) {
      return res.status(404).send('Category not found');
    }

    await category.update(req.body);
    res.json(category);
  });

  return app;
};

module.exports = {
  createServer,
};
