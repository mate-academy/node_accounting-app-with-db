'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { models } = require('./models/models');
const { Op } = require('sequelize');

function createServer() {
  const app = express();

  app.use(bodyParser.json());

  app.get('/users', async (req, res) => {
    try {
      const users = await models.User.findAll();

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/users', async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const newUser = await models.User.create({ name });

      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/users/:id', async (req, res) => {
    try {
      const user = await models.User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await models.User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.patch('/users/:id', async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const user = await models.User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.name = name;
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/expenses', async (req, res) => {
    try {
      const { userId, categories, from, to } = req.query;

      const where = {};

      if (userId) {
        where.userId = userId;
      }

      if (categories) {
        where.category = Array.isArray(categories)
          ? categories
          : categories.split(',');
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

      const expenses = await models.Expense.findAll({ where });

      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/expenses', async (req, res) => {
    try {
      const { userId, spentAt, title, amount, category, note } = req.body;

      if (!userId || !spentAt || !title || !amount || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await models.User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const newExpense = await models.Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      res.status(201).json(newExpense);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    try {
      const expense = await models.Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      res.status(200).json(expense);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    try {
      const expense = await models.Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      await expense.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    try {
      const { spentAt, title, amount, category, note, userId } = req.body;

      const expense = await models.Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      if (userId) {
        const user = await models.User.findByPk(userId);

        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
        expense.userId = userId;
      }

      if (spentAt) {
        expense.spentAt = spentAt;
      }

      if (title) {
        expense.title = title;
      }

      if (amount) {
        expense.amount = amount;
      }

      if (category) {
        expense.category = category;
      }

      if (note) {
        expense.note = note;
      }

      await expense.save();
      res.status(200).json(expense);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return app;
}

module.exports = {
  createServer,
};
