'use strict';

const express = require('express');
const { User } = require('./models/User.model.js');
const { Expense } = require('./models/Expense.model.js');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = await User.create({ name });

    res.status(201).json(newUser);
  });

  app.get('/users/:id', async (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.destroy({ where: { id } });
    res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const updatedUser = await user.update({ name });

    res.status(200).json(updatedUser);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;

    if (!userId || !title || amount == null || !spentAt) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const newExpenses = await Expense.create({
      userId,
      title,
      amount,
      category,
      note,
      spentAt: spentAt || new Date().toISOString(),
    });

    res.status(201).json(newExpenses);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = await Expense.findAll();

    if (userId) {
      filteredExpenses = filteredExpenses.filter((e) => e.userId === +userId);
    }

    if (categories) {
      const categoriesList = String(categories)
        .split(',')
        .map((c) => c.trim());

      filteredExpenses = filteredExpenses.filter((e) => {
        return categoriesList.includes(e.category);
      });
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) <= new Date(to),
      );
    }

    res.json(filteredExpenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const expens = await Expense.findByPk(id);

    if (!expens) {
      return res.status(404).json({ message: 'Expens not found' });
    }

    res.json(expens);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const expens = await Expense.findByPk(id);

    if (!expens) {
      return res.status(404).json({ message: 'Expens not found' });
    }

    await expens.destroy();
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const expens = await Expense.findByPk(id);

    if (!expens) {
      return res.status(404).json({ message: 'Expens not found' });
    }

    const { title, amount, category, note, spentAt } = req.body;

    if (title !== undefined) {
      expens.title = title;
    }

    if (amount !== undefined) {
      expens.amount = amount;
    }

    if (category !== undefined) {
      expens.category = category;
    }

    if (note !== undefined) {
      expens.note = note;
    }

    if (spentAt !== undefined) {
      expens.spentAt = spentAt;
    }

    await expens.save();
    res.status(200).json(expens);
  });

  return app;
};

module.exports = {
  createServer,
};
