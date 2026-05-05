'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

User.hasMany(Expense, { foreignKey: 'userId', constraints: false });
Expense.belongsTo(User, { foreignKey: 'userId', constraints: false });

function createServer() {
  const app = express();

  app.use(express.json());

  app.post('/users', async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const user = await User.create({ name });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  });

  app.patch('/users/:id', async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update({ name });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/expenses', async (req, res) => {
    try {
      const { userId, spentAt, title, amount, category, note } = req.body;

      if (!userId || !spentAt || !title || amount === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const expense = await Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/expenses', async (req, res) => {
    try {
      const whereCondition = {};

      if (req.query.userId) {
        whereCondition.userId = req.query.userId;
      }

      if (req.query.categories) {
        whereCondition.category = {
          [Op.in]: req.query.categories.split(','),
        };
      }

      if (req.query.from || req.query.to) {
        whereCondition.spentAt = {};

        if (req.query.from) {
          whereCondition.spentAt[Op.gte] = new Date(req.query.from);
        }

        if (req.query.to) {
          whereCondition.spentAt[Op.lte] = new Date(req.query.to);
        }
      }

      const expenses = await Expense.findAll({
        where: whereCondition,
      });

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
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  });

  return app;
}

module.exports = {
  createServer,
};
