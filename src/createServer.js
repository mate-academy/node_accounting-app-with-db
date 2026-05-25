'use strict';

const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');

const {
  models: { User, Expense },
} = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Users
  app.post('/users', async (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = await User.create({ name });

    return res.status(201).json(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    return res.status(200).json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    return res.status(200).json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body || {};

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (name !== undefined) {
      user.name = name;
    }

    await user.save();

    return res.status(200).json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.destroy();

    return res.sendStatus(204);
  });

  // Expenses
  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body || {};

    if (!spentAt || !title || amount === undefined || !userId) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const expense = await Expense.create({
      spentAt,
      title,
      amount,
      category,
      note,
      userId,
    });

    return res.status(201).json(expense);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;

    const where = {};

    if (userId) {
      where.userId = Number(userId);
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
      const list = categories.split(',').map((c) => c.trim());

      where.category = { [Op.in]: list };
    }

    const expenses = await Expense.findAll({ where, order: [['id', 'ASC']] });

    return res.status(200).json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    return res.status(200).json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note, userId } = req.body || {};

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    if (userId !== undefined) {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      expense.userId = userId;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    await expense.save();

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.destroy();

    return res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
