'use strict';

const express = require('express');
const cors = require('cors');
const { User } = require('./models/User.model.js');
const { Expense } = require('./models/Expense.model.js');
const { Op } = require('sequelize');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // #region Users

  app.get('/users', async (req, res) => {
    const result = await User.findAll();

    res.statusCode = 200;
    res.send(result);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    res.statusCode = 200;
    res.send(user);
  });

  app.post('/users', express.json(), async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;
      res.send('Bad request');

      return;
    }

    const user = await User.create({ name });

    res.statusCode = 201;
    res.send(user);
  });

  app.patch('/users/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    if (typeof name !== 'string') {
      res.statusCode = 400;
      res.send('Bad request');

      return;
    }

    await User.update({ name }, { where: { id } });

    const updatedUser = await User.findByPk(id);

    res.statusCode = 200;
    res.send(updatedUser);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      // res.statusCode = 404;
      res.sendStatus(404);

      return;
    }

    await User.destroy({ where: { id } });

    res.sendStatus(204);
  });

  // #endregion

  // #region  Expenses

  app.get('/expenses', express.json(), async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (categories) {
      const categoriesArray = categories.split(',');

      where.category = categoriesArray;
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

    res.statusCode = 200;
    res.send(expenses);
  });

  app.post('/expenses', express.json(), async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = await User.findByPk(userId);

    if (!user || !spentAt || !title || !amount) {
      res.statusCode = 400;
      res.send('Bad request');

      return;
    }

    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    res.statusCode = 200;
    res.send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    await Expense.destroy({ where: { id } });

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    await Expense.update(
      {
        spentAt,
        title,
        amount,
        category,
        note,
      },
      { where: { id } },
    );

    const updatedExpense = await Expense.findByPk(id);

    res.statusCode = 200;
    res.send(updatedExpense);
  });

  // #endregion

  return app;
};

module.exports = {
  createServer,
};
