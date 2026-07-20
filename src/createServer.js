'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // ---------- Users ----------

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    user.name = req.body.name;
    await user.save();

    res.send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await user.destroy();
    res.sendStatus(204);
  });

  // ---------- Expenses ----------

  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (!spentAt || !title || !amount || !userId) {
      res.sendStatus(400);

      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.sendStatus(400);

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

    res.send(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(expense, req.body);
    await expense.save();

    res.send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
