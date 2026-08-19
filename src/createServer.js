'use strict';

const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

const requiredExpenseFields = [
  'spentAt',
  'title',
  'amount',
  'userId',
];

const expenseFields = [
  ...requiredExpenseFields,
  'category',
  'note',
];

function isMissing(value) {
  return value === undefined || value === null || value === '';
}

function parseId(value) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

function isInvalidDate(value) {
  return Number.isNaN(new Date(value).getTime());
}

function pickFields(source, fields) {
  return fields.reduce((result, field) => {
    if (!Object.prototype.hasOwnProperty.call(source, field)) {
      return result;
    }

    return {
      ...result,
      [field]: source[field],
    };
  }, {});
}

function parseCategories(value) {
  if (!value) {
    return [];
  }

  const values = Array.isArray(value) ? value : [value];

  return values
    .flatMap((item) => item.split(','))
    .map((item) => item.trim())
    .filter(Boolean);
}

function hasInvalidExpensePatch(data) {
  return requiredExpenseFields.some(
    (field) =>
      Object.prototype.hasOwnProperty.call(data, field) &&
      isMissing(data[field]),
  );
}

function createServer() {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader(
      'Content-Type',
      'application/json; charset=utf-8',
    );
    next();
  });
  app.use(cors());
  app.use(express.json());

  app.post('/users', async (req, res) => {
    const { name } = req.body || {};

    if (isMissing(name)) {
      res.status(400).json({ error: 'Name is required' });

      return;
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll({
      order: [['id', 'ASC']],
    });

    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (!id) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (!id) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    const { name } = req.body || {};

    if (isMissing(name)) {
      res.status(400).json({ error: 'Name is required' });

      return;
    }

    user.name = name;
    await user.save();

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (!id) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    await user.destroy();

    res.status(204).end();
  });

  app.post('/expenses', async (req, res) => {
    const data = req.body || {};
    const hasAllRequiredFields = requiredExpenseFields.every(
      (field) => !isMissing(data[field]),
    );

    if (!hasAllRequiredFields || isInvalidDate(data.spentAt)) {
      res.status(400).json({ error: 'Invalid expense data' });

      return;
    }

    const userId = parseId(data.userId);

    if (!userId) {
      res.status(400).json({ error: 'User not found' });

      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(400).json({ error: 'User not found' });

      return;
    }

    const expenseData = {
      ...pickFields(data, expenseFields),
      userId,
    };
    const expense = await Expense.create(expenseData);

    res.status(201).json(expense);
  });

  app.get('/expenses', async (req, res) => {
    const where = {};

    if (req.query.userId !== undefined) {
      const userId = parseId(req.query.userId);

      if (!userId) {
        res.status(400).json({ error: 'Invalid userId' });

        return;
      }

      where.userId = userId;
    }

    if (req.query.from || req.query.to) {
      where.spentAt = {};

      if (req.query.from) {
        if (isInvalidDate(req.query.from)) {
          res.status(400).json({ error: 'Invalid date range' });

          return;
        }

        where.spentAt[Op.gte] = new Date(req.query.from);
      }

      if (req.query.to) {
        if (isInvalidDate(req.query.to)) {
          res.status(400).json({ error: 'Invalid date range' });

          return;
        }

        where.spentAt[Op.lte] = new Date(req.query.to);
      }
    }

    const categories = parseCategories(req.query.categories);

    if (categories.length > 0) {
      where.category = {
        [Op.in]: categories,
      };
    }

    const expenses = await Expense.findAll({
      where,
      order: [['id', 'ASC']],
    });

    res.json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (!id) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (!id) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    const body = req.body || {};

    if (hasInvalidExpensePatch(body)) {
      res.status(400).json({ error: 'Invalid expense data' });

      return;
    }

    if (
      Object.prototype.hasOwnProperty.call(body, 'spentAt') &&
      isInvalidDate(body.spentAt)
    ) {
      res.status(400).json({ error: 'Invalid expense data' });

      return;
    }

    const data = pickFields(body, expenseFields);

    if (Object.prototype.hasOwnProperty.call(data, 'userId')) {
      const userId = parseId(data.userId);

      if (!userId) {
        res.status(400).json({ error: 'User not found' });

        return;
      }

      const user = await User.findByPk(userId);

      if (!user) {
        res.status(400).json({ error: 'User not found' });

        return;
      }

      data.userId = userId;
    }

    await expense.update(data);

    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (!id) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    await expense.destroy();

    res.status(204).end();
  });

  return app;
}

module.exports = {
  createServer,
};
