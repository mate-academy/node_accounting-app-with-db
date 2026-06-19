'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Category, Expense },
} = require('./models/models');

function createServer() {
  const app = express();

  app.use(express.json());

  // ===== USERS =====
  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.status(200).send(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const newUser = await User.create({ name });

    res.status(201).send(newUser);
  });

  app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).send(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (name) {
      user.name = name;
    }
    await user.save();
    res.status(200).send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await user.destroy();
    res.sendStatus(204);
  });

  // ===== CATEGORIES =====
  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.status(200).send(categories);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const category = await Category.create({ name });

    res.status(201).send(category);
  });

  app.get('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.sendStatus(404);
    }

    res.status(200).send(category);
  });

  app.patch('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.sendStatus(404);
    }

    if (name) {
      category.name = name;
    }
    await category.save();
    res.status(200).send(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.sendStatus(404);
    }

    await category.destroy();
    res.sendStatus(204);
  });

  // ===== EXPENSES =====
  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (from || to) {
      where.spentAt = {};
    }

    if (from) {
      where.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      where.spentAt[Op.lte] = new Date(to);
    }

    const includeOptions = [{ model: Category, required: false }];

    if (categories) {
      includeOptions[0].where = { name: categories };
      includeOptions[0].required = true;
    }

    const expenses = await Expense.findAll({
      where,
      include: includeOptions,
      order: [['id', 'ASC']],
    });

    res.status(200).send(expenses.map(formatExpense));
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, note, category } = req.body;

    if (!Number.isInteger(userId)) {
      return res.status(400).send({ message: 'Invalid userId' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    if (!spentAt || !title || amount === undefined) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    let categoryId = null;

    if (category) {
      let cat = await Category.findOne({ where: { name: category } });

      if (!cat) {
        cat = await Category.create({ name: category });
      }
      categoryId = cat.id;
    }

    const expense = await Expense.create({
      userId,
      categoryId,
      spentAt,
      title,
      amount,
      note: note || null,
    });

    const full = await Expense.findByPk(expense.id, {
      include: [{ model: Category, required: false }],
    });

    res.status(201).send(formatExpense(full));
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const expense = await Expense.findByPk(id, {
      include: [{ model: Category, required: false }],
    });

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).send(formatExpense(expense));
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    if (category !== undefined) {
      let cat = await Category.findOne({ where: { name: category } });

      if (!cat) {
        cat = await Category.create({ name: category });
      }
      expense.categoryId = cat.id;
    }

    await expense.update({
      spentAt,
      title,
      amount,
      note,
    });

    const full = await Expense.findByPk(id, {
      include: [{ model: Category, required: false }],
    });

    res.status(200).send(formatExpense(full));
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.sendStatus(400);
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expense.destroy();
    res.sendStatus(204);
  });

  return app;
}

function formatExpense(expense) {
  const data = expense.toJSON();
  const result = {
    id: data.id,
    userId: data.userId,
    spentAt: data.spentAt,
    title: data.title,
    amount: data.amount,
    note: data.note,
  };

  if (data.Category) {
    result.category = data.Category.name;
  } else {
    result.category = null;
  }

  return result;
}
module.exports = { createServer };
