'use strict';

const express = require('express');
const { models } = require('./models');
const { User, Expense, Category } = models;

function createServer() {
  const app = express();
  app.use(express.json());

  const send400 = (res, message = 'Bad Request') =>
    res.status(400).json({ message });
  const send404 = (res, message = 'Not Found') =>
    res.status(404).json({ message });

  // USERS CRUD
  app.get('/users', async (req, res) => res.json(await User.findAll()));
  app.post('/users', async (req, res) => {
    const { name } = req.body;
    if (!name) return send400(res, 'name is required');
    const user = await User.create({ name });
    res.status(201).json(user);
  });
  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return send404(res, 'user not found');
    res.json(user);
  });
  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return send404(res, 'user not found');
    const { name } = req.body;
    if (!name) return send400(res, 'name is required');
    await user.update({ name });
    res.json(user);
  });
  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return send404(res, 'user not found');
    await user.destroy();
    res.status(204).send();
  });

  // EXPENSES CRUD
  app.get('/expenses', async (req, res) => {
    const { userId, category } = req.query;
    const where = {};
    if (userId) where.userId = userId;
    if (category) where.category = category;
    const expenses = await Expense.findAll({ where });
    res.json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    if (!userId || !title || !amount || !spentAt || !category)
      return send400(res, 'Missing fields');
    const user = await User.findByPk(userId);
    if (!user) return send400(res, 'user not found');
    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });
    res.status(201).json(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return send404(res, 'expense not found');
    res.json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return send404(res, 'expense not found');
    await expense.update(req.body);
    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return send404(res, 'expense not found');
    await expense.destroy();
    res.status(204).send();
  });

  // CATEGORIES CRUD
  app.get('/categories', async (req, res) =>
    res.json(await Category.findAll()),
  );
  app.post('/categories', async (req, res) => {
    const { name } = req.body;
    if (!name) return send400(res, 'name is required');
    const category = await Category.create({ name });
    res.status(201).json(category);
  });
  app.get('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return send404(res, 'category not found');
    res.json(category);
  });
  app.patch('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return send404(res, 'category not found');
    const { name } = req.body;
    if (!name) return send400(res, 'name is required');
    await category.update({ name });
    res.json(category);
  });
  app.delete('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return send404(res, 'category not found');
    await category.destroy();
    res.status(204).send();
  });

  return app;
}

module.exports = { createServer };
