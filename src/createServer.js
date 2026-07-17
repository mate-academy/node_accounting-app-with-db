'use strict';

const express = require('express');
const { Op } = require('sequelize');

const { models } = require('../src/models/models');
const { User, Expense } = models;

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    try {
      const newUser = await User.create({ name });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const userId = +req.params.id;

    try {
      const deletedCount = await User.destroy({ where: { id: userId } });

      if (deletedCount === 0) {
        return res.status(404).send('User not found');
      }

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  });

  app.patch('/users/:id', async (req, res) => {
    const userId = +req.params.id;

    if (!req.body.name) {
      return res.status(400).send('Name is required');
    }

    try {
      const patchedUser = await User.findByPk(userId);

      if (!patchedUser) {
        return res.status(404).send('User not found');
      }

      patchedUser.name = req.body.name;
      await patchedUser.save();

      return res.status(200).json(patchedUser);
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  });

  app.get('/users/:id', async (req, res) => {
    const userId = +req.params.id;

    try {
      const foundUser = await User.findByPk(userId);

      if (!foundUser) {
        return res.status(404).send('User not found');
      }

      return res.status(200).json(foundUser);
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  });

  app.get('/expenses', async (req, res) => {
    const { userId, category, from, to } = req.query;
    const whereConditions = {};

    if (userId) {
      whereConditions.userId = +userId;
    }

    if (category) {
      whereConditions.category = category;
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
      return res.status(500).send('Internal Server Error');
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId) {
      return res.status(400).send('UserId is required');
    }

    if (!spentAt) {
      return res.status(400).send('SpentAt is required');
    }

    if (!title) {
      return res.status(400).send('Title is required');
    }

    if (!amount) {
      return res.status(400).send('Amount is required');
    }

    try {
      const user = await User.findByPk(userId);

      if (user === null) {
        return res.status(400).send('User not found');
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
      return res.status(500).send('Internal Server Error');
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expenseId = +req.params.id;

    try {
      const deletedCount = await Expense.destroy({ where: { id: expenseId } });

      if (deletedCount === 0) {
        return res.status(404).send('Expense not found');
      }

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expenseId = +req.params.id;

    if (!req.body.title) {
      return res.status(400).send('Title is required');
    }

    try {
      const patchedExpense = await Expense.findByPk(expenseId);

      if (!patchedExpense) {
        return res.status(404).send('Expense not found');
      }

      patchedExpense.title = req.body.title;
      await patchedExpense.save();

      return res.status(200).json(patchedExpense);
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    const expenseId = +req.params.id;

    try {
      const expense = await Expense.findByPk(expenseId);

      if (!expense) {
        return res.status(404).send('Expense not found');
      }

      return res.status(200).json(expense);
    } catch (error) {
      return res.status(500).send('Internal Server Error');
    }
  });

  return app;
};

module.exports = {
  createServer,
};
