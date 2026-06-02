'use strict';

const express = require('express');
const { User } = require('./models/User.model');

const createServer = () => {
  const app = express();
  const users = [];
  const expenses = [];
  let nextExpenseId = 1;

  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = await User.create({ name });

    return res.status(201).json(newUser);
  });

  app.get('/users', (req, res) => {
    return res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) {
      user.name = name;
    }

    return res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((u) => u.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(index, 1);

    return res.sendStatus(204);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!spentAt || !title || !amount || !category) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;
    const categorySet = categories ? new Set(categories.split(',')) : null;

    const filteredExpenses = expenses.filter((expense) => {
      if (userId && expense.userId !== Number(userId)) {
        return false;
      }

      if (fromDate && new Date(expense.spentAt) < fromDate) {
        return false;
      }

      if (toDate && new Date(expense.spentAt) > toDate) {
        return false;
      }

      if (categorySet && !categorySet.has(expense.category)) {
        return false;
      }

      return true;
    });

    return res.json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseId = Number(id);
    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseId = Number(id);
    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    return res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseId = Number(id);
    const index = expenses.findIndex((e) => e.id === expenseId);

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses.splice(index, 1);

    return res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
