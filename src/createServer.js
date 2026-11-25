'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUuid = (value) => typeof value === 'string' && UUID_PATTERN.test(value);

const isValidDate = (value) => {
  if (value === undefined || value === null || value === '') {
    return false;
  }

  const date = new Date(value);

  return !Number.isNaN(date.getTime());
};

const isFiniteNumber = (value) =>
  typeof value === 'number' && Number.isFinite(value);

const isPositiveInteger = (value) => {
  const num = Number(value);

  return Number.isInteger(num) && num > 0;
};

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  const validateUserId = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!isUuid(id)) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  });

  const validateExpenseId = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!isPositiveInteger(id)) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    req.expense = expense;
    next();
  });

  const validateExpenseBody = (req, res, next) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (
      !spentAt ||
      !title ||
      amount === undefined ||
      amount === null ||
      !userId
    ) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    if (!isUuid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    if (!isValidDate(spentAt)) {
      return res.status(400).json({ message: 'Invalid spentAt' });
    }

    if (!isFiniteNumber(amount)) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    if (
      category !== undefined &&
      category !== null &&
      typeof category !== 'string'
    ) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    if (note !== undefined && note !== null && typeof note !== 'string') {
      return res.status(400).json({ message: 'Invalid note' });
    }

    next();
  };

  const validateExpenseQuery = (req, res, next) => {
    const { userId, from, to, categories } = req.query;

    if (userId !== undefined && !isUuid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    if (from !== undefined && !isValidDate(from)) {
      return res.status(400).json({ message: 'Invalid from date' });
    }

    if (to !== undefined && !isValidDate(to)) {
      return res.status(400).json({ message: 'Invalid to date' });
    }

    if (categories !== undefined && typeof categories !== 'string') {
      return res.status(400).json({ message: 'Invalid categories' });
    }

    next();
  };

  const validateExpensePatchBody = (req, res, next) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (userId !== undefined && !isUuid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    if (spentAt !== undefined && !isValidDate(spentAt)) {
      return res.status(400).json({ message: 'Invalid spentAt' });
    }

    if (amount !== undefined && !isFiniteNumber(amount)) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    if (title !== undefined && typeof title !== 'string') {
      return res.status(400).json({ message: 'Invalid title' });
    }

    if (
      category !== undefined &&
      category !== null &&
      typeof category !== 'string'
    ) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    if (note !== undefined && note !== null && typeof note !== 'string') {
      return res.status(400).json({ message: 'Invalid note' });
    }

    next();
  };

  app.post(
    '/users',
    asyncHandler(async (req, res) => {
      const { name } = req.body;

      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Name is required' });
      }

      const user = await User.create({ name: name.trim() });

      return res.status(201).json(user);
    }),
  );

  app.get(
    '/users',
    asyncHandler(async (req, res) => {
      const users = await User.findAll();

      return res.status(200).json(users);
    }),
  );

  app.get('/users/:id', validateUserId, (req, res) => {
    return res.status(200).json(req.user);
  });

  app.patch(
    '/users/:id',
    validateUserId,
    asyncHandler(async (req, res) => {
      const { name } = req.body;

      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Name is required' });
      }
      await req.user.update({ name: name.trim() });

      return res.status(200).json(req.user);
    }),
  );

  app.delete(
    '/users/:id',
    validateUserId,
    asyncHandler(async (req, res) => {
      await req.user.destroy();

      return res.status(204).send();
    }),
  );

  app.post(
    '/expenses',
    validateExpenseBody,
    asyncHandler(async (req, res) => {
      const { spentAt, title, amount, userId, category, note } = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const expense = await Expense.create({
        spentAt: new Date(spentAt),
        title,
        amount,
        userId,
        category: category || null,
        note: note || null,
      });

      return res.status(201).json(expense);
    }),
  );

  app.get(
    '/expenses',
    validateExpenseQuery,
    asyncHandler(async (req, res) => {
      const { userId, from, to, categories } = req.query;
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
        const categoryList = categories.split(',').map((c) => c.trim());

        where.category = {
          [Op.in]: categoryList,
        };
      }

      const expenses = await Expense.findAll({ where });

      return res.status(200).json(expenses);
    }),
  );

  app.get('/expenses/:id', validateExpenseId, (req, res) => {
    return res.status(200).json(req.expense);
  });

  app.patch(
    '/expenses/:id',
    validateExpensePatchBody,
    validateExpenseId,
    asyncHandler(async (req, res) => {
      const { spentAt, title, amount, userId, category, note } = req.body;

      if (userId !== undefined) {
        const user = await User.findByPk(userId);

        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }
      }

      const updateData = {};

      if (spentAt !== undefined) {
        updateData.spentAt = new Date(spentAt);
      }

      if (title !== undefined) {
        updateData.title = title;
      }

      if (amount !== undefined) {
        updateData.amount = amount;
      }

      if (userId !== undefined) {
        updateData.userId = userId;
      }

      if (category !== undefined) {
        updateData.category = category;
      }

      if (note !== undefined) {
        updateData.note = note;
      }

      await req.expense.update(updateData);

      return res.status(200).json(req.expense);
    }),
  );

  app.delete(
    '/expenses/:id',
    validateExpenseId,
    asyncHandler(async (req, res) => {
      await req.expense.destroy();

      return res.status(204).send();
    }),
  );

  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);

    return res.status(500).json({ message: 'Internal server error' });
  });

  return app;
};

module.exports = {
  createServer,
};
