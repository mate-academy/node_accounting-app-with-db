'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { models: { User, Expense } } = require('./models/models');

function createServer() {
  const app = express();

  app.use(express.json());

  // Ensure all responses are JSON with explicit charset
  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // ─── USERS ──────────────────────────────────────

  // GET /users
  app.get('/users', async (req, res, next) => {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });

  // POST /users
  app.post('/users', async (req, res, next) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const newUser = await User.create({ name });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  });

  // GET /users/:id
  app.get('/users/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

  // PATCH /users/:id
  app.patch('/users/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { name } = req.body;

      if (name !== undefined) {
        user.name = name;
        await user.save();
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

  // DELETE /users/:id
  app.delete('/users/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  // ─── EXPENSES ─────────────────────────────────────

  // GET /expenses
  app.get('/expenses', async (req, res, next) => {
    try {
      const { userId, categories, from, to } = req.query;

      const where = {};

      if (userId !== undefined) {
        where.userId = Number(userId);
      }

      if (categories !== undefined) {
        const categoryList = String(categories)
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean);

        where.category = { [Op.in]: categoryList };
      }

      if (from !== undefined || to !== undefined) {
        where.spentAt = {};

        if (from !== undefined) {
          where.spentAt[Op.gte] = new Date(from);
        }

        if (to !== undefined) {
          where.spentAt[Op.lte] = new Date(to);
        }
      }

      const expenses = await Expense.findAll({ where });

      res.status(200).json(expenses);
    } catch (error) {
      next(error);
    }
  });

  // POST /expenses
  app.post('/expenses', async (req, res, next) => {
    try {
      const { userId, spentAt, title, amount, category, note } = req.body;

      if (!userId || !spentAt || !title || amount === undefined) {
        return res.status(400).json({
          message: 'userId, spentAt, title and amount are required',
        });
      }

      const user = await User.findByPk(Number(userId));

      if (!user) {
        return res
          .status(400)
          .json({ message: 'User with given id does not exist' });
      }

      const newExpense = await Expense.create({
        userId: Number(userId),
        spentAt,
        title,
        amount,
        category: category || null,
        note: note || '',
      });

      res.status(201).json(newExpense);
    } catch (error) {
      next(error);
    }
  });

  // GET /expenses/:id
  app.get('/expenses/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const expense = await Expense.findByPk(id);

      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  });

  // PATCH /expenses/:id
  app.patch('/expenses/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const expense = await Expense.findByPk(id);

      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      const { spentAt, title, amount, category, note, userId } = req.body;

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

      if (userId !== undefined) {
        expense.userId = Number(userId);
      }

      await expense.save();

      res.status(200).json(expense);
    } catch (error) {
      next(error);
    }
  });

  // DELETE /expenses/:id
  app.delete('/expenses/:id', async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const expense = await Expense.findByPk(id);

      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      await expense.destroy();
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  // Basic error handler as a safety net
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });

  return app;
}

module.exports = { createServer };
