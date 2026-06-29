'use strict';

const express = require('express');
const cors = require('cors');
const { models } = require('./models/models');
const { Op } = require('sequelize');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // #region users
  app.get('/users', async (req, res) => {
    const users = await models.User.findAll();

    res.status(200).json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const users = await models.User.findByPk(id);

    if (!users) {
      res.sendStatus(404);

      return;
    }

    res.status(200).json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const user = await models.User.create({ name });

    res.status(201).json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const users = await models.User.findByPk(id);

    if (!users) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    await users.update({ name });

    res.status(200).json(users);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const users = await models.User.findByPk(id);

    if (!users) {
      res.sendStatus(404);

      return;
    }

    await models.User.destroy({ where: { id } });

    res.sendStatus(204);
  });
  // #endregion

  // #region expenses
  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const where = {};

    if (userId) {
      where.userId = userId;
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
      const categoryList = categories
        .split(',')
        .map((category) => category.trim())
        .filter(Boolean);

      where.category = {
        [Op.in]: categoryList,
      };
    }

    const expense = await models.Expense.findAll({ where });

    res.status(200).json(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await models.Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.status(200).json(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      res
        .status(400)
        .json({ message: 'One or more required fields are missing' });

      return;
    }

    if (!(await models.User.findByPk(userId))) {
      res.status(400).json({
        message: 'The user tablet do not have user with id: ' + 'userId',
      });
    }

    const expense = await models.Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    const expense = await models.Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (
      [userId, spentAt, title, amount, category, note].every(
        (v) => v === undefined,
      )
    ) {
      return res.status(400).json({
        message: 'One required field are missing',
      });
    }

    await expense.update({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await models.Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await expense.destroy();

    res.sendStatus(204);
  });
  // #endregion

  return app;
};

module.exports = {
  createServer,
};
