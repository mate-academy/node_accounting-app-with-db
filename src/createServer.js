'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { models } = require('./models/models');

const { User, Expense } = models;

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = await User.create({ name });

    res.status(201).send(newUser);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await user.destroy();
    res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await user.update({ name }, { silent: true });
    res.send(user);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      res.sendStatus(400);

      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const newExpense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).send(newExpense);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (categories) {
      where.category = categories.split(',');
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

    const expenses = await Expense.findAll({ where });

    res.send(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expense.update(req.body);

    const updatedExpense = await Expense.findByPk(id);

    res.send(updatedExpense);
  });

  return app;
};

module.exports = {
  createServer,
};
