'use strict';

const express = require('express');
const cors = require('cors');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Op } = require('sequelize');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const normalizeUser = ({ id, name }) => {
    return {
      id,
      name,
    };
  };

  const normalizeExpense = ({
    title,
    id,
    amount,
    spentAt,
    userId,
    category,
    note,
  }) => {
    return {
      title,
      id,
      amount,
      spentAt,
      userId,
      category,
      note,
    };
  };

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users.map((user) => normalizeUser(user)));
  });

  app.post('/users', async (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const newUser = await User.create({ name });

    res.status(201).json(normalizeUser(newUser));
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(normalizeUser(user));
  });

  app.patch('/users/:id', async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (name !== undefined) {
      await user.update({ name });
    }

    res.json(normalizeUser(user));
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await User.destroy({ where: { id } });

    res.sendStatus(204);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const whereParams = {};

    if (userId) {
      whereParams.userId = userId;
    }

    if (from || to) {
      whereParams.spentAt = {};
    }

    if (from) {
      whereParams.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      whereParams.spentAt[Op.lte] = new Date(to);
    }

    if (categories) {
      const list = categories.split(',').map((category) => category.trim());

      whereParams.category = {
        [Op.in]: list,
      };
    }

    const expenses = await Expense.findAll({
      where: whereParams,
    });

    res.json(expenses.map((ex) => normalizeExpense(ex)));
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const isInvalid =
      userId === undefined ||
      spentAt === undefined ||
      !title ||
      amount === undefined;

    if (isInvalid) {
      return res.sendStatus(400);
    }

    const userExists = await User.findByPk(userId);

    if (!userExists) {
      return res.sendStatus(400);
    }

    const newExpense = await Expense.create({
      title,
      amount,
      spentAt,
      userId,
      category,
      note,
    });

    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(normalizeExpense(expense));
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (isNaN(id)) {
      return res.sendStatus(400);
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.update({
      ...(userId !== undefined && { userId: userId }),
      ...(spentAt !== undefined && { spentAt }),
      ...(title !== undefined && { title }),
      ...(amount !== undefined && { amount: Number(amount) }),
      ...(category !== undefined && { category }),
      ...(note !== undefined && { note }),
    });

    return res.json(normalizeExpense(expense));
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await Expense.destroy({ where: { id } });

    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
