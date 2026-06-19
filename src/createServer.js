'use strict';

const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const {
  models: { User, Expense, Category },
} = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).send({ error: 'User not found' });

      return;
    }

    res.send(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ error: 'Name is required' });

      return;
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  app.patch('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).send({ error: 'User not found' });

      return;
    }

    await user.update({ name });

    res.send(user);
  });

  app.put('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).send({ error: 'User not found' });

      return;
    }

    await user.update({ name });

    res.send(user);
  });

  app.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).send({ error: 'User not found' });

      return;
    }

    await user.destroy();

    res.status(204).send();
  });

  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.send(categories);
  });

  app.get('/categories/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).send({ error: 'Category not found' });

      return;
    }

    res.send(category);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ error: 'Name is required' });

      return;
    }

    const category = await Category.create({ name });

    res.status(201).send(category);
  });

  app.patch('/categories/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).send({ error: 'Category not found' });

      return;
    }

    await category.update({ name });

    res.send(category);
  });

  app.put('/categories/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).send({ error: 'Category not found' });

      return;
    }

    await category.update({ name });

    res.send(category);
  });

  app.delete('/categories/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      res.status(404).send({ error: 'Category not found' });

      return;
    }

    await category.destroy();

    res.status(204).send();
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;

    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (from && to) {
      where.spentAt = {
        [Op.gte]: from,
        [Op.lte]: to,
      };
    }

    if (categories) {
      where.categoryId = categories;
    }

    const expenses = await Expense.findAll({ where });

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', async (req, res) => {
    const { expenseId } = req.params;

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      res.status(404).send({ error: 'Expense not found' });

      return;
    }

    res.send(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, categoryId, note, userId } = req.body;

    if (!spentAt || !title || !amount || !userId) {
      res.status(400).send({ error: 'Required fields are missing' });

      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(400).send({ error: 'User not found' });

      return;
    }

    const expense = await Expense.create({
      spentAt,
      title,
      amount,
      categoryId,
      note,
      userId,
    });

    res.status(201).send(expense);
  });

  app.patch('/expenses/:expenseId', async (req, res) => {
    const { expenseId } = req.params;

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      res.status(404).send({ error: 'Expense not found' });

      return;
    }

    await expense.update(req.body);

    res.send(expense);
  });

  app.delete('/expenses/:expenseId', async (req, res) => {
    const { expenseId } = req.params;

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      res.status(404).send({ error: 'Expense not found' });

      return;
    }

    await expense.destroy();

    res.status(204).send();
  });

  return app;
};

module.exports = {
  createServer,
};
