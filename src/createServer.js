'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { Op } = require('sequelize');
const {
  models: { User, Expense, Category },
} = require('./models/models');

function createServer() {
  const app = express();

  app.use(bodyParser.json());

  app.post('/users', async (req, res) => {
    try {
      const { name } = req.body || {};

      if (typeof name !== 'string') {
        return res.status(400).json({ error: 'Name must be a string' });
      }

      const trimmed = name.trim();

      if (trimmed === '') {
        return res.status(400).json({ error: 'Name cannot be empty' });
      }

      const user = await User.create({ name: trimmed });

      res.status(201).json(user);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.patch('/users/:id', async (req, res) => {
    try {
      const { name } = req.body || {};
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '') {
          return res.status(400).json({ error: 'Invalid name' });
        }
        user.name = name.trim();
      }

      await user.save();
      res.json(user);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    try {
      const deleted = await User.destroy({ where: { id: req.params.id } });

      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).end();
    } catch {
      res.status(500).json({ error: 'Server error' });
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
          where.spentAt[Op.gte] = new Date(from);
        }

        if (to) {
          where.spentAt[Op.lte] = new Date(to);
        }
      }

      if (categories) {
        const cats = Array.isArray(categories)
          ? categories
          : categories.split(',');

        where.category = cats.length === 1 ? cats[0] : { [Op.in]: cats };
      }

      const expenses = await Expense.findAll({ where });

      res.json(expenses);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/expenses', async (req, res) => {
    try {
      const { userId, spentAt, title, amount, category, note } = req.body || {};
      const parsedUserId = Number(userId);

      if (!parsedUserId || parsedUserId <= 0) {
        return res.status(400).json({ error: 'Invalid userId' });
      }

      if (
        typeof spentAt !== 'string' ||
        typeof title !== 'string' ||
        title.trim() === '' ||
        typeof amount !== 'number'
      ) {
        return res
          .status(400)
          .json({ error: 'Missing or invalid required fields' });
      }

      const user = await User.findByPk(parsedUserId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const expenseData = {
        userId: parsedUserId,
        spentAt: new Date(spentAt),
        title: title.trim(),
        amount,
        category: category || null,
        note: note || null,
      };

      const expense = await Expense.create(expenseData);

      res.status(201).json(expense);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.json(expense);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      const fields = ['spentAt', 'title', 'amount', 'category', 'note'];
      let updated = false;

      for (const field of fields) {
        if (req.body[field] !== undefined) {
          expense[field] = req.body[field];
          updated = true;
        }
      }

      if (!updated) {
        return res
          .status(400)
          .json({ error: 'No valid fields provided for update' });
      }

      await expense.save();
      res.json(expense);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    try {
      const deleted = await Expense.destroy({ where: { id: req.params.id } });

      if (!deleted) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(204).end();
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/categories', async (req, res) => {
    try {
      const categories = await Category.findAll();

      res.json(categories);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/categories', async (req, res) => {
    try {
      const { name } = req.body || {};

      if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required' });
      }

      const trimmed = name.trim();

      const category = await Category.create({ name: trimmed });

      res.status(201).json(category);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Category name already exists' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/categories/:categoryId', async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.categoryId);

      if (!category) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.json(category);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.patch('/categories/:categoryId', async (req, res) => {
    try {
      const { name } = req.body || {};
      const category = await Category.findByPk(req.params.categoryId);

      if (!category) {
        return res.status(404).json({ error: 'Not found' });
      }

      if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '') {
          return res.status(400).json({ error: 'Invalid name' });
        }
        category.name = name.trim();
      }

      await category.save();
      res.json(category);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.delete('/categories/:categoryId', async (req, res) => {
    try {
      const deleted = await Category.destroy({
        where: { id: req.params.categoryId },
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.status(204).end();
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  });

  return app;
}

module.exports = { createServer };
