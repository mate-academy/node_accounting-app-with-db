'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { models } = require('./models/models');

const { User, Expense } = models;

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    return res.status(200).send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const userId = Number(req.params.id);

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: 'User does not exist',
      });
    }

    return res.status(200).send(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({
        message: 'User name is required',
      });
    }

    const newUser = await User.create({
      name,
    });

    return res.status(201).send(newUser);
  });

  app.delete('/users/:id', async (req, res) => {
    const userId = Number(req.params.id);

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: 'User does not exist',
      });
    }

    await user.destroy();

    return res.status(204).end();
  });

  app.patch('/users/:id', async (req, res) => {
    const userId = Number(req.params.id);
    const { name } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({
        message: 'User does not exist',
      });
    }

    await user.update({
      name,
    });

    return res.status(200).send(user);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (categories) {
      where.category = {
        [Op.in]: categories.split(','),
      };
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

    const expenses = await Expense.findAll({
      where,
    });

    return res.status(200).send(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || amount === undefined) {
      return res.status(400).send({
        message: 'Required fields are missing',
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send({
        message: 'User does not exist',
      });
    }

    const newExpense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return res.status(201).send(newExpense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expenseId = Number(req.params.id);

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).send({
        message: 'Expense does not exist',
      });
    }

    return res.status(200).send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expenseId = Number(req.params.id);

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).send({
        message: 'Expense does not exist',
      });
    }

    await expense.destroy();

    return res.status(204).end();
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expenseId = Number(req.params.id);

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).send({
        message: 'Expense does not exist',
      });
    }

    await expense.update(req.body);

    return res.status(200).send(expense);
  });

  return app;
};

module.exports = {
  createServer,
};
