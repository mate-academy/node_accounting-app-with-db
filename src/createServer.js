'use strict';

const express = require('express');
const { User, Expense } = require('./models/models').models;

function createServer() {
  const app = express();
  const { Op } = require('sequelize');

  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    const { name } = req.body;

    if (name !== undefined) {
      user.name = name;
      await user.save();
    }

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const deleted = await User.destroy({
      where: { id: Number(req.params.id) },
    });

    if (!deleted) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      spentAt === undefined ||
      title === undefined ||
      amount === undefined
    ) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (from || to) {
      where.spentAt = {};

      if (from) {
        where.spentAt[Op.gte] = new Date(from);
      }

      if (to) {
        where.spentAt[Op.lte] = new Date(to);
      }
    }

    if (categories) {
      where.category = { [Op.in]: categories.split(',') };
    }

    const expenses = await Expense.findAll({ where });

    res.json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    const { userId } = req.body;

    if (userId !== undefined) {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.sendStatus(400);
      }
    }

    Object.assign(expense, req.body);

    await expense.save();

    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const deleted = await Expense.destroy({
      where: { id: Number(req.params.id) },
    });

    if (!deleted) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
