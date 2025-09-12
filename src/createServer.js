'use strict';

const express = require('express');
const { models } = require('./models/models'); 
const { User, Expense, Category } = models;

function createServer() {
  const app = express();

  app.use(express.json());

  const send400 = (res, message = 'Bad Request') => {
    res.status(400).json({ message });
  };

  const send404 = (res, message = 'Not Found') => {
    res.status(404).json({ message });
  };

  // USERS
  app.get('/users', async (req, res) => {
    res.json(await User.findAll());
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      send400(res, 'name is required');
      return;
    }

    const user = await User.create({ name });
    res.status(201).json(user);
  });

  app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      send404(res, 'user not found');
      return;
    }

    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body || {};

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');
      return;
    }

    if (!name) {
      send400(res, 'name is required');
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      send404(res, 'user not found');
      return;
    }

    await user.update({ name });
    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      send404(res, 'user not found');
      return;
    }

    await user.destroy();
    res.status(204).send();
  });

  // EXPENSES
  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const where = {};

    if (userId !== undefined) {
      if (!Number.isInteger(Number(userId))) {
        send400(res, 'userId should be integer');
        return;
      }
      where.userId = Number(userId);
    }

    if (categories !== undefined) {
      let cats;

      if (Array.isArray(categories)) {
        cats = categories.flatMap((c) => String(c).split(','));
      } else {
        cats = String(categories).split(',');
      }

      where.category = cats;
    }

    if ((from && isNaN(Date.parse(from))) || (to && isNaN(Date.parse(to)))) {
      send400(res, 'from/to should be valid date-time');
      return;
    }

    if (from !== undefined) {
      where.spentAt = { ...where.spentAt, $gte: new Date(from) };
    }

    if (to !== undefined) {
      where.spentAt = { ...where.spentAt, $lte: new Date(to) };
    }

    const result = await Expense.findAll({ where });
    res.json(result);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};

    if (userId === undefined) {
      send400(res, 'userId is required');
      return;
    }

    if (!Number.isInteger(Number(userId))) {
      send400(res, 'userId should be integer');
      return;
    }

    if (!spentAt || isNaN(Date.parse(spentAt))) {
      send400(res, 'spentAt should be date-time');
      return;
    }

    if (!title) {
      send400(res, 'title is required');
      return;
    }

    if (amount === undefined || !Number.isInteger(Number(amount))) {
      send400(res, 'amount should be integer');
      return;
    }

    if (!category) {
      send400(res, 'category is required');
      return;
    }

    const userExists = await User.findByPk(userId);

    if (!userExists) {
      send400(res, 'user not found');
      return;
    }

    const expense = await Expense.create({
      userId: Number(userId),
      spentAt: new Date(spentAt).toISOString(),
      title,
      amount: Number(amount),
      category,
      note,
    });

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');
      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      send404(res, 'expense not found');
      return;
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { spentAt, title, amount, category, note } = req.body || {};

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');
      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      send404(res, 'expense not found');
      return;
    }

    const updateData = {};

    if (spentAt !== undefined) {
      if (isNaN(Date.parse(spentAt))) {
        send400(res, 'spentAt should be date-time');
        return;
      }
      updateData.spentAt = new Date(spentAt).toISOString();
    }

    if (title !== undefined) {
      updateData.title = title;
    }

    if (amount !== undefined) {
      if (!Number.isInteger(Number(amount))) {
        send400(res, 'amount should be integer');
        return;
      }
      updateData.amount = Number(amount);
    }

    if (category !== undefined) {
      updateData.category = category;
    }

    if (note !== undefined) {
      updateData.note = note;
    }

    await expense.update(updateData);
    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');
      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      send404(res, 'expense not found');
      return;
    }

    await expense.destroy();
    res.status(204).send();
  });

  // CATEGORIES
  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body || {};

    if (!name) {
      send400(res, 'name is required');
      return;
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  });

  app.get('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');
      return;
    }

    const category = await Category.findByPk(id);

    if (!category) {
      send404(res, 'category not found');
      return;
    }

    res.json(category);
  });

  app.patch('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body || {};

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');
      return;
    }

    const category = await Category.findByPk(id);

    if (!category) {
      send404(res, 'category not found');
      return;
    }

    if (!name) {
      send400(res, 'name is required');
      return;
    }

    await category.update({ name });
    res.json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      send400(res, 'id should be integer');
      return;
    }

    const category = await Category.findByPk(id);

    if (!category) {
      send404(res, 'category not found');
      return;
    }

    await category.destroy();
    res.status(204).send();
  });

  return app;
}

module.exports = { createServer };
