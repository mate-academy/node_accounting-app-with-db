'use strict';

const express = require('express');
const {
  models: { User, Expense },
} = require('./models/models');

const createServer = () => {
  const app = express();

  app.get('/users', async (_, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);
    }

    res.send(user);
  });

  app.post('/users', express.json(), async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = await User.create({ name });

    res.status(201).send(newUser);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await User.destroy({ where: { id } });
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = await user.update({ name });

    res.send(updatedUser);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const expensesList = await Expense.findAll();

    if (userId || from || to || categories) {
      const filteredExpenses = expensesList.filter((item) => {
        if (userId && item.userId !== Number(userId)) {
          return false;
        }

        if (from && new Date(item.spentAt) < new Date(from)) {
          return false;
        }

        if (to && new Date(item.spentAt) > new Date(to)) {
          return false;
        }

        if (categories && !categories.split(',').includes(item.category)) {
          return false;
        }

        return true;
      });

      res.send(filteredExpenses);

      return;
    }

    res.send(expensesList);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.post('/expenses', express.json(), async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    if (amount < 0 || !spentAt || !title || !amount || !category) {
      res.sendStatus(400);

      return;
    }

    const newExpense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;

    res.send(newExpense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await Expense.destroy({ where: { id } });
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (req.body.userId) {
      // client should not be able to change userId IMO
      res.sendStatus(400);

      return;
    }

    const updatedExpense = await expense.update(req.body);

    res.send(updatedExpense);
  });

  return app;
};

module.exports = {
  createServer,
};
