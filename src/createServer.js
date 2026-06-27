'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll({ order: [['id', 'ASC']] });

    res.status(200).json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.status(200).json(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    const { name } = req.body || {};

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    await user.update({ name });

    res.status(200).json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    await user.destroy();

    res.status(204).end();
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
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

    if (categories) {
      const categoryList = categories
        .split(',')
        .map((category) => category.trim())
        .filter(Boolean);

      if (categoryList.length > 0) {
        where.category = {
          [Op.in]: categoryList,
        };
      }
    }

    const expenses = await Expense.findAll({
      where,
      order: [['id', 'ASC']],
    });

    res.status(200).json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.status(200).json(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body || {};

    if (!spentAt || !title || amount === undefined || !userId) {
      res.status(400).json({ message: 'Required fields are missing' });

      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const expense = await Expense.create({
      spentAt,
      title,
      amount,
      userId,
      category,
      note,
    });

    res.status(201).json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    const { userId } = req.body || {};

    if (userId !== undefined) {
      const user = await User.findByPk(userId);

      if (!user) {
        res.status(400).json({ message: 'User not found' });

        return;
      }
    }

    await expense.update(req.body || {});

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    await expense.destroy();

    res.status(204).end();
  });

  return app;
};

module.exports = {
  createServer,
};
