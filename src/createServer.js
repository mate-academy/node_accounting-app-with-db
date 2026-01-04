'use strict';

const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const { models } = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/users', async (req, res) => {
    const users = await models.User.findAll();

    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      // eslint-disable-next-line no-useless-return
      return;
    }

    const newUser = await models.User.create({ name });

    res.status(201).json(newUser);
  });

  app.get('/users/:userId', async (req, res) => {
    const user = await models.User.findByPk(req.params.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      // eslint-disable-next-line no-useless-return
      return;
    }

    res.json(user);
  });

  app.patch('/users/:userId', async (req, res) => {
    const user = await models.User.findByPk(req.params.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      // eslint-disable-next-line no-useless-return
      return;
    }

    if (req.body.name) {
      user.name = req.body.name;
      await user.save();
    }

    res.status(200).json(user);
  });

  app.delete('/users/:userId', async (req, res) => {
    const user = await models.User.findByPk(req.params.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      // eslint-disable-next-line no-useless-return
      return;
    }

    await user.destroy();
    res.status(204).end();
  });

  app.get('/expenses', async (req, res) => {
    const where = {};

    if (req.query.userId) {
      where.userId = Number(req.query.userId);
    }

    if (req.query.categories) {
      const categoriesToMatch = Array.isArray(req.query.categories)
        ? req.query.categories
        : [req.query.categories];

      where.category = { [Op.in]: categoriesToMatch };
    }

    if (req.query.from || req.query.to) {
      where.spentAt = {};

      if (req.query.from) {
        where.spentAt[Op.gte] = new Date(req.query.from);
      }

      if (req.query.to) {
        where.spentAt[Op.lte] = new Date(req.query.to);
      }
    }

    const expenses = await models.Expense.findAll({ where });

    res.json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || amount === undefined) {
      res.status(400).json({ message: 'Missing required fields' });

      return;
    }

    const user = await models.User.findByPk(userId);

    if (!user) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const newExpense = await models.Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category: category || null,
      note: note || null,
    });

    res.status(201).json(newExpense);
  });

  app.get('/expenses/:expenseId', async (req, res) => {
    const expense = await models.Expense.findByPk(req.params.expenseId);

    if (!expense) {
      res.status(404).json({ message: 'Expanse not found' });

      // eslint-disable-next-line no-useless-return
      return;
    }

    res.json(expense);
  });

  app.patch('/expenses/:expenseId', async (req, res) => {
    const expense = await models.Expense.findByPk(req.params.expenseId);

    if (!expense) {
      res.status(404).json({ message: 'Expanse not found' });

      // eslint-disable-next-line no-useless-return
      return;
    }

    const allowedUpdates = ['spentAt', 'title', 'amount', 'category', 'note'];

    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) {
        expense[key] = req.body[key];
      }
    });

    await expense.save();
    res.status(200).json(expense);
  });

  app.delete('/expenses/:expenseId', async (req, res) => {
    const expense = await models.Expense.findByPk(req.params.expenseId);

    if (!expense) {
      res.status(404).json({ message: 'Expanse not found' });

      // eslint-disable-next-line no-useless-return
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
