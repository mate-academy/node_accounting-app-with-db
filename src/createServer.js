'use strict';

const express = require('express');
const { Op } = require('sequelize');

const {
  models: { User, Expense },
} = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(express.json());

  // Added middleware to ensure req.body is always defined
  app.use((req, res, next) => {
    if (!req.body) {
      req.body = {};
    }
    next();
  });

  // ====================
  // Users
  // ====================

  // POST /users
  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (name === undefined) {
      res.status(400).send();

      return;
    }

    const user = await User.create({
      name,
    });

    res.status(201).json(user);
  });

  // GET /users
  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  // GET /users/:id
  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).send();

      return;
    }

    res.json(user);
  });

  // PATCH /users/:id
  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).send();

      return;
    }

    if (req.body.name === undefined) {
      res.status(400).send();

      return;
    }

    await user.update({
      name: req.body.name,
    });

    res.json(user);
  });

  // DELETE /users/:id
  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).send();

      return;
    }

    await user.destroy();

    res.status(204).send();
  });

  // ====================
  // Expenses
  // ====================

  // POST /expenses
  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, category, note, userId } = req.body;

    if (
      spentAt === undefined ||
      title === undefined ||
      amount === undefined ||
      userId === undefined
    ) {
      res.status(400).send();

      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(400).send();

      return;
    }

    const expense = await Expense.create({
      spentAt,
      title,
      amount,
      category,
      note,
      userId,
    });

    res.status(201).json(expense);
  });

  // GET /expenses
  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;

    const where = {};

    if (userId !== undefined) {
      where.userId = userId;
    }

    if (from !== undefined || to !== undefined) {
      where.spentAt = {};

      if (from !== undefined) {
        where.spentAt[Op.gte] = from;
      }

      if (to !== undefined) {
        where.spentAt[Op.lte] = to;
      }
    }

    if (categories !== undefined) {
      where.category = {
        [Op.in]: categories.split(',').map((category) => category.trim()),
      };
    }

    const expenses = await Expense.findAll({
      where,
    });

    res.json(expenses);
  });

  // GET /expenses/:id
  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.status(404).send();

      return;
    }

    res.json(expense);
  });

  // PATCH /expenses/:id
  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.status(404).send();

      return;
    }

    await expense.update(req.body);

    res.json(expense);
  });

  // DELETE /expenses/:id
  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.status(404).send();

      return;
    }

    await expense.destroy();

    res.status(204).send();
  });

  return app;
};

module.exports = {
  createServer,
};
