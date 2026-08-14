'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required' });
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.status(200).send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }
    res.status(200).send(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.update(req.body);
    res.status(200).send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.destroy();
    res.sendStatus(204);
  });

  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (!spentAt || !title || amount === undefined || !userId) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = await Expense.create({
      spentAt,
      title,
      amount,
      userId,
      category,
      note,
    });

    res.status(201).send(expense);
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
      where.category = { [Op.in]: categories.split(',') };
    }

    const expenses = await Expense.findAll({ where });

    res.status(200).send(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }
    res.status(200).send(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.update(req.body);
    res.status(200).send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
