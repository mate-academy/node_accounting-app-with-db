'use strict';

const express = require('express');

const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const user = await User.update({ name }, { where: { id } });

    if (user[0] === 0) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = await User.findByPk(id);

    res.send(updatedUser);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const deleted = await User.destroy({
      where: { id },
    });

    if (deleted === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  });

  app.get('/expenses', async (req, res) => {
    try {
      const { category, userId } = req.query;

      const where = {};

      if (category) {
        where.category = category;
      }

      if (userId) {
        where.userId = Number(userId);
      }

      const expenses = await Expense.findAll({ where });

      res.send(expenses);
    } catch (error) {
      res.sendStatus(404);
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const expense = await Expense.findByPk(id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      res.send(expense);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!Number.isInteger(userId) || !Number.isInteger(amount)) {
      res.sendStatus(400);

      return;
    }

    try {
      const assignedUser = await User.findByPk(userId);

      if (!assignedUser) {
        res.sendStatus(400);

        return;
      }

      const newExpense = await Expense.create({
        userId,
        spentAt,
        title,
        amount,
        ...(category !== undefined && { category }),
        ...(note !== undefined && { note }),
      });

      res.status(201).send(newExpense);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    try {
      const expense = await Expense.findByPk(id);

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      if (
        (userId && typeof userId !== 'number') ||
        (spentAt && typeof spentAt !== 'string') ||
        (title && typeof title !== 'string') ||
        (amount && typeof amount !== 'number') ||
        (category && typeof category !== 'string') ||
        (note && typeof note !== 'string')
      ) {
        res.sendStatus(400);

        return;
      }

      await expense.update({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      res.send(expense);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Expense.destroy({
        where: { id },
      });

      if (deleted === 0) {
        return res.sendStatus(404);
      }

      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  return app;
}

module.exports = {
  createServer,
};
