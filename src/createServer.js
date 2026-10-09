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

  // Create a user.
  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = await User.create({ name });

    return res.status(201).json(user);
  });

  // Get all users.
  app.get('/users', async (req, res) => {
    const users = await User.findAll({
      order: [['id', 'ASC']],
    });

    return res.status(200).json(users);
  });

  // Get a user by ID.
  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  });

  // Update a user.
  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    await user.update({ name });

    return res.status(200).json(user);
  });

  // Delete a user.
  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    return res.status(204).end();
  });

  // Create an expense.
  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (
      !spentAt ||
      !title ||
      amount === undefined ||
      amount === null ||
      userId === undefined ||
      userId === null
    ) {
      return res.status(400).json({
        message: 'spentAt, title, amount and userId are required',
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const expense = await Expense.create({
      spentAt,
      title,
      amount,
      userId: user.id,
      category,
      note,
    });

    return res.status(201).json(expense);
  });

  // Get expenses, with optional filters.
  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId !== undefined) {
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
      where.category = {
        [Op.in]: categories.split(','),
      };
    }

    const expenses = await Expense.findAll({
      where,
      order: [['id', 'ASC']],
    });

    return res.status(200).json(expenses);
  });

  // Get an expense by ID.
  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json(expense);
  });

  // Update an expense.
  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { spentAt, title, amount, userId, category, note } = req.body;

    const updates = {};

    if (spentAt !== undefined) {
      updates.spentAt = spentAt;
    }

    if (title !== undefined) {
      updates.title = title;
    }

    if (amount !== undefined) {
      updates.amount = amount;
    }

    if (category !== undefined) {
      updates.category = category;
    }

    if (note !== undefined) {
      updates.note = note;
    }

    if (userId !== undefined) {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      updates.userId = user.id;
    }

    await expense.update(updates);

    return res.status(200).json(expense);
  });

  // Delete an expense.
  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();

    return res.status(204).end();
  });

  // Handle unexpected asynchronous errors.
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);

    if (res.headersSent) {
      return next(err);
    }

    return res.status(500).json({ message: 'Internal server error' });
  });

  return app;
};

module.exports = {
  createServer,
};
