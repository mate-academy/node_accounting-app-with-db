// src/createServer.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, User, Expense, Category } = require('./models/models');

const createServer = () => {
  const app = express();
  app.use(bodyParser.json());

  // RELACJE
  User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
  Expense.belongsTo(User, { foreignKey: 'userId' });

  Category.hasMany(Expense, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
  Expense.belongsTo(Category, { foreignKey: 'categoryId' });

  // INIT DB
  const initDB = async () => {
    if (process.env.NODE_ENV === 'test') {
      await sequelize.sync({ force: true });
    } else {
      await sequelize.sync();
    }
  };
  initDB();

  // ================= USERS =================
  app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    const user = await User.create({ name });
    res.status(201).json(user);
  });

  app.put('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(204).end();
  });

  // ================= EXPENSES =================
  app.get('/expenses', async (req, res) => {
    const expenses = await Expense.findAll();
    res.json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, title, amount, categoryId, spentAt, note } = req.body;
    if (!userId || !title || amount === undefined || !categoryId || !spentAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const category = await Category.findByPk(categoryId);
    if (!category) return res.status(400).json({ error: 'Category not found' });

    const expense = await Expense.create({ userId, title, amount, categoryId, spentAt, note });
    res.status(201).json(expense);
  });

  app.put('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    await expense.update(req.body);
    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    await expense.destroy();
    res.status(204).end();
  });

  // ================= CATEGORIES =================
  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
  });

  app.get('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    const category = await Category.create({ name });
    res.status(201).json(category);
  });

  app.put('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    await category.update(req.body);
    res.json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    await category.destroy();
    res.status(204).end();
  });

  return app;
};

module.exports = createServer;
