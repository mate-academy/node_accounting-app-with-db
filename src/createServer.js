'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { models } = require('./models/models');
const { User, Expense } = models;

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    return res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  });

  app.post('/users/', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = await User.create({ name });

    return res.status(201).json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    if (name) {
      await User.update({ name }, { where: { id } });
      user.name = name;
    }

    return res.json(user);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, amount, title, spentAt, category, note } = req.body;

    if (amount === undefined || !title || !spentAt || !userId) {
      return res.status(400).json({ error: 'required fields are missing' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    const expense = await Expense.create({
      spentAt,
      title,
      amount,
      userId,
      category,
      note,
    });

    return res.status(201).json(expense);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (categories) {
      const categoriesList = Array.isArray(categories)
        ? categories
        : categories.split(',');

      where.category = { [Op.in]: categoriesList };
    }

    if (from || to) {
      where.spentAt = {};

      if (from) {
        where.spentAt[Op.gte] = from;
      }

      if (to) {
        where.spentAt[Op.lte] = to;
      }
    }

    const expenses = await Expense.findAll({ where });

    return res.json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'not found' });
    }

    return res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'not found' });
    }

    await expense.destroy();

    return res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'not found' });
    }

    await expense.update(req.body);

    return res.json(expense);
  });

  return app;
};

module.exports = {
  createServer,
};
