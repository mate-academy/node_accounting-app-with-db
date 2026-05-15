'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // --- Users API ---

  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.post('/users', async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).send();
      }

      const newUser = await User.create({ name });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).send();
      }
      res.json(user);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.patch('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).send();
      }

      if (req.body.name) {
        user.name = req.body.name;
        await user.save();
      }
      res.json(user);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).send();
      }

      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).send();
    }
  });

  // --- Expenses API ---

  app.get('/expenses', async (req, res) => {
    try {
      const { userId, categories, from, to } = req.query;
      const whereConditions = {};

      if (userId) {
        whereConditions.userId = Number(userId);
      }

      if (categories) {
        const categoryList = categories.split(',');

        whereConditions.category = {
          [Op.in]: categoryList,
        };
      }

      if (from || to) {
        whereConditions.spentAt = {};

        if (from) {
          whereConditions.spentAt[Op.gte] = from;
        }

        if (to) {
          whereConditions.spentAt[Op.lte] = to;
        }
      }

      const expenses = await Expense.findAll({ where: whereConditions });

      const formattedExpenses = expenses.map((e) => {
        const plain = e.get({ plain: true });

        plain.amount = Number(plain.amount);

        return plain;
      });

      res.json(formattedExpenses);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.post('/expenses', async (req, res) => {
    try {
      const { amount, category, userId, title, note, spentAt } = req.body;

      if (!spentAt || !title || amount === undefined || !userId) {
        return res.status(400).send();
      }

      const userExists = await User.findByPk(userId);

      if (!userExists) {
        return res.status(400).send();
      }

      const newExpense = await Expense.create({
        amount: Number(amount),
        category: category || null,
        userId: Number(userId),
        title,
        note: note || null,
        spentAt: spentAt,
      });

      const responseData = newExpense.get({ plain: true });

      responseData.amount = Number(responseData.amount);

      res.status(201).json(responseData);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).send();
      }

      const responseData = expense.get({ plain: true });

      responseData.amount = Number(responseData.amount);

      res.json(responseData);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).send();
      }

      await expense.update(req.body);
      await expense.reload();

      const responseData = expense.get({ plain: true });

      responseData.amount = Number(responseData.amount);

      res.json(responseData);
    } catch (error) {
      res.status(500).send();
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).send();
      }

      await expense.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).send();
    }
  });

  return app;
};

module.exports = {
  createServer,
};
