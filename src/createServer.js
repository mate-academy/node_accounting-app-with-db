'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

const createServer = () => {
  const app = express();

  // Глобальный middleware для установки требуемого заголовка
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // Middleware для парсинга JSON тела запроса
  app.use(express.json());

  // ============================
  // USERS ENDPOINTS
  // ============================

  app.post('/users', async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const user = await User.create({ name });

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  });

  app.patch('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  });

  // ============================
  // EXPENSES ENDPOINTS
  // ============================

  app.post('/expenses', async (req, res) => {
    try {
      const { spentAt, title, amount, userId, category, note } = req.body;

      if (!spentAt || !title || amount === undefined || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const expense = await Expense.create({
        spentAt,
        title,
        amount,
        userId,
        category,
        note,
      });

      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

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

      const expenses = await Expense.findAll({ where });

      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      res.status(200).json(expense);
    } catch (error) {
      res.status(404).json({ error: 'Expense not found' });
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      await expense.update(req.body);
      res.status(200).json(expense);
    } catch (error) {
      res.status(404).json({ error: 'Expense not found' });
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      await expense.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: 'Expense not found' });
    }
  });

  return app;
};

module.exports = {
  createServer,
};
