'use strict';

const express = require('express');
const { Op } = require('sequelize');

const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Category } = require('./models/Category');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name required');
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    await Expense.destroy({
      where: { userId: req.params.id },
    });

    await user.destroy();

    res.sendStatus(204);
  });

  const updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    await user.update({ name });

    return res.send(user);
  };

  app.put('/users/:id', updateUser);
  app.patch('/users/:id', updateUser);

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name required');
    }

    const category = await Category.create({ name });

    res.status(201).send(category);
  });

  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.send(categories);
  });

  app.get('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.send(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    await category.destroy();

    res.sendStatus(204);
  });

  app.post('/expenses', async (req, res) => {
    let { title } = req.body;
    const { spentAt, amount, userId, category, note } = req.body;

    if (!spentAt || !title || !amount || !userId) {
      return res.status(400).send('Missing fields');
    }

    title = title.trim();

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = await Expense.create({
      spentAt,
      title,
      amount,
      userId,
      category,
      note,
    });

    res.status(201).send(expense);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
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
        [Op.in]: String(categories)
          .split(',')
          .map((value) => value.trim()),
      };
    }

    const expenses = await Expense.findAll({
      where,
      order: [['id', 'ASC']],
    });

    res.send(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.send(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    let { title } = req.body;
    const { spentAt, amount, category, note } = req.body;

    if (title) {
      title = title.trim();
    }

    await expense.update({
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await expense.destroy();

    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
