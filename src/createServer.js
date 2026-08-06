'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models.js');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = await User.create({ name });

    res.status(201).json(newUser);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name !== undefined) {
      user.name = name;
      await user.save();
    }

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.sendStatus(204);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const where = {};

    if (userId !== undefined) {
      const userExists = await User.findByPk(userId);

      if (!userExists) {
        return res.status(400).json({ message: 'User not found' });
      }

      where.userId = Number(userId);
    }

    if (categories) {
      const categoryList = String(categories)
        .split(',')
        .map((c) => c.trim());

      where.category = { [Op.in]: categoryList };
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

    const expenses = await Expense.findAll({ where });

    res.json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;

    if (userId === undefined || !title || amount === undefined || !spentAt) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newExpense = await Expense.create({
      userId: Number(userId),
      title,
      amount,
      category: category || null,
      note: note || '',
      spentAt,
    });

    res.status(201).json(newExpense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { userId, title, amount, category, note, spentAt } = req.body;

    if (userId !== undefined) {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      expense.userId = Number(userId);
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

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    await expense.save();

    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
