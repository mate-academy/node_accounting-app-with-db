'use strict';

const express = require('express');

function createServer() {
  const app = express();
  const {
    models: { User, Expense },
  } = require('./models/models');

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.status(200).json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = await User.create({
      name,
    });

    res.status(201).json(newUser);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: 'Not found',
      });
    }

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const deletedRows = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(204).send();
  });

  app.patch('/users/:id', async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const { name } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Not found' });
    }
    user.name = name;

    await user.save();
    res.status(200).json(user);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    let expenses = await Expense.findAll();

    if (userId) {
      expenses = expenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      expenses = expenses.filter((ex) => categoriesArray.includes(ex.category));
    }

    if (from) {
      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    res.status(200).json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;

    if (!title || amount === undefined) {
      return res.status(400).json({
        error: 'Title and amount are required',
      });
    }

    const userFinded = await User.findByPk(userId);

    if (!userFinded) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    const newExpense = await Expense.create({
      userId,
      title,
      amount,
      category,
      note,
      spentAt,
    });

    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expenseId = Number(req.params.id);

    const expenseFinded = await Expense.findByPk(expenseId);

    if (!expenseFinded) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    res.status(200).json(expenseFinded);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const deleted = await Expense.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deleted === 0) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    res.status(204).send();
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { userId, title, amount } = req.body;

    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    if (userId !== undefined) {
      expense.userId = Number(userId);
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    await expense.save();
    res.status(200).json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
