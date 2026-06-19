/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');

const createServer = () => {
  const app = express();

  app.use(express.json());

  User.sync();
  Expense.sync();

  // #region users

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = await User.create({ name });

    return res.status(201).json(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    return res.status(200).json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const idUser = Number(req.params.id);

    if (Number.isNaN(idUser)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const user = await User.findByPk(idUser);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const idUser = Number(req.params.id);

    if (Number.isNaN(idUser)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const { name } = req.body;
    const user = await User.findByPk(idUser);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    user.name = name;
    await user.save();

    return res.status(200).json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const idUser = Number(req.params.id);

    if (Number.isNaN(idUser)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const user = await User.findByPk(idUser);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.status(204).end();
  });

  // #endregion

  // #region Expenses

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const whereClause = {};

    if (userId) {
      whereClause.userId = Number(userId);
    }

    const expenses = await Expense.findAll({ where: whereClause });
    let result = expenses;

    if (categories) {
      const targetCategories = categories.split(',');

      result = result.filter((e) => targetCategories.includes(e.category));
    }

    if (from) {
      const startTime = new Date(from).getTime();

      result = result.filter((e) => new Date(e.spentAt).getTime() >= startTime);
    }

    if (to) {
      const endTime = new Date(to).getTime();

      result = result.filter((e) => new Date(e.spentAt).getTime() <= endTime);
    }

    return res.status(200).json(result);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !title || amount === undefined || !spentAt) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const user = await User.findByPk(Number(userId));

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newExpense = await Expense.create({
      userId: Number(userId),
      spentAt,
      title,
      amount: Number(amount),
      category: category || null,
      note: note || '',
    });

    return res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const idExpense = Number(req.params.id);

    if (Number.isNaN(idExpense)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const expense = await Expense.findByPk(idExpense);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res.status(200).json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const idExpense = Number(req.params.id);

    if (Number.isNaN(idExpense)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const expense = await Expense.findByPk(idExpense);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    Object.assign(expense, req.body);

    if (req.body.userId) {
      expense.userId = Number(req.body.userId);
    }

    if (req.body.amount) {
      expense.amount = Number(req.body.amount);
    }

    await expense.save();

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const idExpense = Number(req.params.id);

    if (Number.isNaN(idExpense)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const expense = await Expense.findByPk(idExpense);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.destroy();

    return res.status(204).end();
  });

  // #endregion

  return app;
};

module.exports = { createServer };
