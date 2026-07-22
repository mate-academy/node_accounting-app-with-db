'use strict';

const express = require('express');
const { Op } = require('sequelize');

const { models } = require('../src/models/models');
const { User, Expense } = models;

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const newUser = await User.create({ name });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const userId = +req.params.id;

    try {
      const deletedCount = await User.destroy({ where: { id: userId } });

      if (deletedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.patch('/users/:id', async (req, res) => {
    const userId = +req.params.id;

    try {
      const patchedUser = await User.findByPk(userId);

      if (!patchedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      Object.assign(patchedUser, req.body);
      await patchedUser.save();

      return res.status(200).json(patchedUser);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/users/:id', async (req, res) => {
    const userId = +req.params.id;

    try {
      const foundUser = await User.findByPk(userId);

      if (!foundUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(foundUser);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const whereConditions = {};

    if (userId) {
      whereConditions.userId = +userId;
    }

    if (categories) {
      const categoryArray = categories.split(',');

      whereConditions.category = { [Op.in]: categoryArray };
    }

    if (from || to) {
      whereConditions.spentAt = {};

      if (from) {
        whereConditions.spentAt[Op.gte] = new Date(from);
      }

      if (to) {
        whereConditions.spentAt[Op.lte] = new Date(to);
      }
    }

    try {
      const expenses = await Expense.findAll({
        where: whereConditions,
      });

      return res.status(200).json(expenses);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    if (!spentAt) {
      return res.status(400).json({ error: 'SpentAt is required' });
    }

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    try {
      const user = await User.findByPk(userId);

      if (user === null) {
        return res.status(400).json({ error: 'User not found' });
      }

      const newExpense = await Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      return res.status(201).json(newExpense);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expenseId = +req.params.id;

    try {
      const deletedCount = await Expense.destroy({ where: { id: expenseId } });

      if (deletedCount === 0) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expenseId = +req.params.id;

    try {
      const patchedExpense = await Expense.findByPk(expenseId);

      if (!patchedExpense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      Object.assign(patchedExpense, req.body);
      await patchedExpense.save();

      return res.status(200).json(patchedExpense);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    const expenseId = +req.params.id;

    try {
      const expense = await Expense.findByPk(expenseId);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      return res.status(200).json(expense);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return app;
};

module.exports = {
  createServer,
};
