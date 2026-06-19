'use strict';

const express = require('express');
const {
  models: { User, Expense, Category },
} = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(express.json());

  // Users
  app.get('/users', async (_req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  });

  app.put('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(req.body);
    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(req.body);
    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.sendStatus(204);
  });

  // Expenses
  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;

    let expenses = await Expense.findAll();

    if (userId) {
      expenses = expenses.filter((e) => e.userId === Number(userId));
    }

    if (from) {
      expenses = expenses.filter((e) => e.spentAt >= from);
    }

    if (to) {
      expenses = expenses.filter((e) => e.spentAt <= to);
    }

    if (categories) {
      const cats = Array.isArray(categories) ? categories : [categories];

      expenses = expenses.filter((e) => cats.includes(e.category));
    }

    res.json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount } = req.body;

    if (!userId || !spentAt || !title || amount === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const expense = await Expense.create(req.body);

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.update(req.body);
    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  // Categories
  app.get('/categories', async (_req, res) => {
    const categories = await Category.findAll();

    res.json(categories);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  });

  app.get('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  });

  app.patch('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.update(req.body);
    res.json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
