'use strict';

const express = require('express');
const {
  models: { User, Expense },
} = require('./models/models');

function createServer() {
  const app = express();

  app.use(express.json());

  // ------------------ USERS ------------------
  app.post('/users', async (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }

    const user = await User.create({ name: String(name) });

    return res.status(201).json(user.toJSON());
  });

  app.get('/users', async (_req, res) => {
    const users = await User.findAll();

    return res.json(users.map((u) => u.toJSON()));
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.json(user.toJSON());
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'Not found' });
    }

    const { name } = req.body || {};

    if (name !== undefined) {
      user.name = String(name);
    }

    await user.save();

    return res.json(user.toJSON());
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'Not found' });
    }

    await user.destroy();

    return res.status(204).end();
  });

  // ------------------ EXPENSES ------------------
  app.post('/expenses', async (req, res) => {
    const body = req.body || {};

    const required = ['userId', 'spentAt', 'title', 'amount'];

    for (const key of required) {
      if (body[key] === undefined) {
        return res.status(400).json({ message: `${key} is required` });
      }
    }

    const user = await User.findByPk(Number(body.userId));

    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }

    const expense = await Expense.create({
      userId: Number(body.userId),
      spentAt: String(body.spentAt),
      title: String(body.title),
      amount: Number(body.amount),
      category: body.category ?? null,
      note: body.note ?? null,
    });

    return res.status(201).json(expense.toJSON());
  });

  function applyFilters(exp, { userId, from, to, categories }) {
    if (userId && Number(exp.userId) !== Number(userId)) {
      return false;
    }

    if (from && exp.spentAt < from) {
      return false;
    }

    if (to && exp.spentAt > to) {
      return false;
    }

    if (categories) {
      const set = new Set(
        String(categories)
          .split(',')
          .map((s) => s.trim()),
      );

      if (!set.has(exp.category || '')) {
        return false;
      }
    }

    return true;
  }

  app.get('/expenses', async (req, res) => {
    const expenses = (await Expense.findAll()).map((e) => e.toJSON());
    const filtered = expenses.filter((e) => applyFilters(e, req.query));

    return res.json(filtered);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.json(expense.toJSON());
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Not found' });
    }

    const updates = req.body || {};

    Object.entries(updates).forEach(([k, v]) => {
      if (v !== undefined) {
        expense[k] = k === 'amount' || k === 'userId' ? Number(v) : String(v);
      }
    });

    await expense.save();

    return res.json(expense.toJSON());
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Not found' });
    }

    await expense.destroy();

    return res.status(204).end();
  });

  return app;
}

module.exports = { createServer };
