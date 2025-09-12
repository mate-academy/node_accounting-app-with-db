function createServer() {
  const express = require('express');
  const bodyParser = require('body-parser');
  const { models: { User, Expense, Category }, initDB } = require('./models/models');

  const app = express();
  app.use(bodyParser.json());

  // --- USERS ---
  app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send();
    res.json(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).send();
    const user = await User.create({ name });
    res.status(201).json(user);
  });

  app.put('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send();
    await user.update(req.body);
    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).send();
    await user.destroy();
    res.status(204).send();
  });

  // --- CATEGORIES ---
  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
  });

  app.get('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send();
    res.json(category);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).send();
    const category = await Category.create({ name });
    res.status(201).json(category);
  });

  app.put('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send();
    await category.update(req.body);
    res.json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send();
    await category.destroy();
    res.status(204).send();
  });

  // --- EXPENSES ---
  app.get('/expenses', async (req, res) => {
    const expenses = await Expense.findAll({ include: [User, Category] });
    res.json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id, { include: [User, Category] });
    if (!expense) return res.status(404).send();
    res.json(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { description, amount, userId, categoryId } = req.body;
    if (!description || amount == null || !userId) return res.status(400).send();
    const user = await User.findByPk(userId);
    if (!user) return res.status(400).send();
    const category = categoryId ? await Category.findByPk(categoryId) : null;
    const expense = await Expense.create({ description, amount, userId, categoryId: category ? category.id : null });
    res.status(201).json(expense);
  });

  app.put('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).send();
    await expense.update(req.body);
    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).send();
    await expense.destroy();
    res.status(204).send();
  });

  return app;
}

module.exports = { createServer, initDB };
