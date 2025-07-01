'use strict';

const express = require('express');
const { expensesService } = require('./services/expensesService');
const { usersService } = require('./services/usersService');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    let expenses = await expensesService.getExpenses();

    if (userId) {
      expenses = expenses.filter((e) => Number(e.userId) === Number(userId));
    }

    if (categories) {
      const categoriesArray = categories.split(',').map((cat) => cat.trim());

      // Тепер використовуйте отриманий масив для фільтрації
      expenses = expenses.filter((e) => categoriesArray.includes(e.category));
    }

    if (from) {
      const fromDate = new Date(from);

      expenses = expenses.filter((e) => new Date(e.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      expenses = expenses.filter((e) => new Date(e.spentAt) <= toDate);
    }

    res.json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = req.params.id;

    if (!id || typeof id !== 'string') {
      return res.status(400).send('Invalid id');
    }

    const expense = await expensesService.getExpense(id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    return res.json(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      return res.status(400).send('Bad request');
    }

    const user = await usersService.getUser(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const expense = await expensesService.createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    return res.status(201).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const deleted = await expensesService.deleteExpense(id);

    if (!deleted) {
      return res.status(404).send('Not found');
    }

    return res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { spentAt, title, amount, category, note } = req.body;
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    if (!spentAt && !title && !amount && !category && !note) {
      return res.status(400).send('Bad request');
    }

    const expense = await expensesService.updateExpense(
      id,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    if (!expense) {
      return res.status(404).send('Not found');
    }

    return res.json(expense);
  });

  app.get('/users', async (req, res) => {
    const users = await usersService.getUsers();

    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const user = await usersService.getUser(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    return res.json(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Bad request');
    }

    const user = await usersService.createUser(name);

    return res.status(201).json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const success = await usersService.deleteUser(id);

    if (!success) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const { name } = req.body;

    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const updated = await usersService.updateUser(id, name);

    if (!updated) {
      return res.status(404).send('Not found');
    }
    res.json(updated);
  });

  return app;
}

module.exports = {
  createServer,
};
