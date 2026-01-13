'use strict';

const express = require('express');
const { Category } = require('./models/Category.model');
const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await User.create({ name });

    return res.status(201).json(user);
  });

  app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!Number.isInteger(id)) {
      return res.sendStatus(400);
    }

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.update({ name });

    const updatedUser = await User.findByPk(id);

    res.json(updatedUser);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.destroy();

    res.sendStatus(204);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const where = {};

    if (userId !== undefined) {
      where.userId = Number(userId);
    }

    if (categories) {
      where.category = Array.isArray(categories) ? categories : [categories];
    }

    const { Op } = require('sequelize');

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

    res.json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      spentAt === undefined ||
      title === undefined ||
      amount === undefined
    ) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category: category || null,
      note: note || null,
    });

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    if (Object.keys(req.body).length === 0) {
      return res.sendStatus(400);
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const { spentAt, title, amount, category, note } = req.body;

    await expense.update({
      ...(spentAt !== undefined && { spentAt }),
      ...(title !== undefined && { title }),
      ...(amount !== undefined && { amount }),
      ...(category !== undefined && { category }),
      ...(note !== undefined && { note }),
    });

    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.destroy();

    res.sendStatus(204);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  });

  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.json(categories);
  });

  app.put('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.sendStatus(404);
    }

    await category.update({ name });

    res.json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.sendStatus(404);
    }

    await category.destroy();

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
