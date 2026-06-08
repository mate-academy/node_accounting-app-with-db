'use strict';

const express = require('express');
const { Op } = require('sequelize');

const {
  models: { User, Expense },
} = require('./models/models');

const requiredExpenseFields = ['spentAt', 'title', 'amount', 'userId'];

const normalizeExpense = (expense) => {
  const plainExpense = expense.toJSON();

  return {
    ...plainExpense,
    spentAt: plainExpense.spentAt.toISOString(),
  };
};

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll({
      order: [['id', 'ASC']],
    });

    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await user.update({
      name: req.body.name,
    });

    res.json(user);
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

  app.post('/expenses', async (req, res) => {
    const hasMissingField = requiredExpenseFields.some(
      (field) => req.body[field] === undefined || req.body[field] === null,
    );

    if (hasMissingField) {
      res.sendStatus(400);

      return;
    }

    const user = await User.findByPk(req.body.userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = await Expense.create(req.body);

    res.status(201).json(normalizeExpense(expense));
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
        where.spentAt[Op.gte] = from;
      }

      if (to) {
        where.spentAt[Op.lte] = to;
      }
    }

    if (categories) {
      where.category = {
        [Op.in]: categories.split(','),
      };
    }

    const expenses = await Expense.findAll({
      where,
      order: [['id', 'ASC']],
    });

    res.json(expenses.map(normalizeExpense));
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.json(normalizeExpense(expense));
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expense.update(req.body);

    res.json(normalizeExpense(expense));
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
