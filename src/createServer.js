'use strict';

const express = require('express');
const cors = require('cors');
const {
  models: { User, Expense },
} = require('./models/models');
const { Op } = require('sequelize');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // User Routes
  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send();
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    await user.update(req.body);
    res.send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    await user.destroy();
    res.status(204).send();
  });

  app.put('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    await user.update(req.body);
    res.send(user);
  });

  // Expense Routes
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
      where.category = categories;
    }

    const expenses = await Expense.findAll({ where });

    res.send(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { title, amount, userId, spentAt, category, note } = req.body;

    if (!title || !amount || !userId) {
      return res.status(400).send();
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send();
    }

    const expense = await Expense.create({
      title,
      amount,
      userId,
      spentAt,
      category,
      note,
    });

    res.status(201).send(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send();
    }
    res.send(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send();
    }
    await expense.update(req.body);
    res.send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send();
    }
    await expense.destroy();
    res.status(204).send();
  });

  return app;
};

module.exports = {
  createServer,
};
