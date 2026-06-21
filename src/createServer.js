/* eslint-disable function-paren-newline */
'use strict';

const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

const { Op } = require('sequelize');

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.post('/users', async (req, res) => {
    if (!req.body.name) {
      return res.status(400).send('Name is required');
    }

    const user = await User.create({
      name: req.body.name,
    });

    res.status(201).json(user);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    await user.destroy();
    res.status(204).send();
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    await user.update(
      {
        name: req.body.name,
      },
      {
        silent: true,
      },
    );

    res.json(user);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;

    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (from && to) {
      where.spentAt = {
        [Op.between]: [from, to],
      };
    } else if (from) {
      where.spentAt = {
        [Op.gte]: from,
      };
    } else if (to) {
      where.spentAt = {
        [Op.lte]: to,
      };
    }

    if (categories) {
      where.category = {
        [Op.in]: categories.split(','),
      };
    }

    const expenses = await Expense.findAll({
      where,
    });

    res.json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    if (
      !req.body.userId ||
      !req.body.spentAt ||
      !req.body.title ||
      !req.body.amount
    ) {
      return res.status(400).send('All fields are required');
    }

    const user = await User.findByPk(req.body.userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = await Expense.create({
      userId: req.body.userId,
      spentAt: req.body.spentAt,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      note: req.body.note,
    });

    return res.status(201).json(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await expense.destroy();
    res.status(204).send();
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await expense.update(req.body);

    res.json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
