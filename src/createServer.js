'use strict';

const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // ===== USERS =====

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await User.create({ name });

    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    user.name = name;
    await user.save();

    res.send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.destroy();

    res.sendStatus(204);
  });

  // ===== EXPENSES =====

  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (!spentAt || !title || !amount || !userId) {
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

    res.statusCode = 201;
    res.send(expense);
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
        where.spentAt[Sequelize.Op.gte] = new Date(from);
      }

      if (to) {
        where.spentAt[Sequelize.Op.lte] = new Date(to);
      }
    }

    if (categories) {
      where.category = {
        [Sequelize.Op.in]: categories.split(','),
      };
    }

    const expenses = await Expense.findAll({ where });

    res.send(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.update(req.body);

    res.send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

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
