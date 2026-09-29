'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

function createServer() {
  const app = express();

  app.use(express.json());

  // Force header on all responses
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // ==========================================
  // USERS API
  // ==========================================

  // POST /users
  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const user = await User.create({ name: name.trim() });

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  // GET /users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // GET /users/:id
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // PATCH /users/:id
  app.patch('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { name } = req.body;

      if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '') {
          return res.status(400).json({ error: 'Invalid name' });
        }
        user.name = name.trim();
        await user.save();
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  // DELETE /users/:id
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // ==========================================
  // EXPENSES API
  // ==========================================

  // POST /expenses
  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (!spentAt || !title || amount === undefined || !userId) {
      return res.status(400).json({
        error: 'spentAt, title, amount, and userId are required fields',
      });
    }

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const expense = await Expense.create({
        spentAt,
        title,
        amount,
        userId,
        category: category || null,
        note: note || null,
      });

      return res.status(201).json(expense);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  // GET /expenses
  app.get('/expenses', async (req, res) => {
    try {
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
        const categoryArray = categories.split(',').map((cat) => cat.trim());

        where.category = { [Op.in]: categoryArray };
      }

      const expenses = await Expense.findAll({ where });

      return res.status(200).json(expenses);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // GET /expenses/:id
  app.get('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      return res.status(200).json(expense);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // PATCH /expenses/:id
  app.patch('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      const { spentAt, title, amount, category, note, userId } = req.body;

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
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  // DELETE /expenses/:id
  app.delete('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      await expense.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  return app;
}

module.exports = {
  createServer,
};
