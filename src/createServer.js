'use strict';

const express = require('express');
const { User, Expense, Category } = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(express.json());

  // Users CRUD
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

  app.post('/users', async (req, res) => {
    const user = await User.create(req.body);

    res.statusCode = 201;
    res.send(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await user.update(req.body);

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

  // Expenses CRUD
  app.get('/expenses', async (req, res) => {
    const { userId } = req.query;

    const where = {};

    if (userId) {
      where.userId = userId;
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

  app.post('/expenses', async (req, res) => {
    const expense = await Expense.create(req.body);

    res.statusCode = 201;
    res.send(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expense.update(req.body);

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

  // Categories CRUD
  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.send(categories);
  });

  app.get('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      res.sendStatus(404);

      return;
    }

    res.send(category);
  });

  app.post('/categories', async (req, res) => {
    const category = await Category.create(req.body);

    res.statusCode = 201;
    res.send(category);
  });

  app.patch('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      res.sendStatus(404);

      return;
    }

    await category.update(req.body);

    res.send(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      res.sendStatus(404);

      return;
    }

    await category.destroy();

    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
