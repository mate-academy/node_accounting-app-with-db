'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { models } = require('./models/models');

const { User, Expense } = models;

const asyncHandler = (handler) => (req, res, next) => {
  return Promise.resolve(handler(req, res, next)).catch(next);
};

const isMissing = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '');

const isValidDate = (value) => !Number.isNaN(new Date(value).getTime());

const parseId = (value) => {
  const id = Number(value);

  return Number.isInteger(id) && id > 0 ? id : null;
};

const findById = (Model, value) => {
  const id = parseId(value);

  return id === null ? null : Model.findByPk(id);
};

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.post(
    '/users',
    asyncHandler(async (req, res) => {
      const { name } = req.body || {};

      if (isMissing(name)) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const user = await User.create({ name });

      return res.status(201).json(user);
    }),
  );

  app.get(
    '/users',
    asyncHandler(async (req, res) => {
      const users = await User.findAll({ order: [['id', 'ASC']] });

      return res.status(200).json(users);
    }),
  );

  app.get(
    '/users/:id',
    asyncHandler(async (req, res) => {
      const user = await findById(User, req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    }),
  );

  app.patch(
    '/users/:id',
    asyncHandler(async (req, res) => {
      const user = await findById(User, req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { name } = req.body || {};

      if (isMissing(name)) {
        return res.status(400).json({ error: 'Name is required' });
      }

      await user.update({ name });

      return res.status(200).json(user);
    }),
  );

  app.delete(
    '/users/:id',
    asyncHandler(async (req, res) => {
      const user = await findById(User, req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      return res.status(204).send();
    }),
  );

  app.post(
    '/expenses',
    asyncHandler(async (req, res) => {
      const { spentAt, title, amount, userId, category, note } = req.body || {};

      if ([spentAt, title, amount, userId].some(isMissing)) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      if (!isValidDate(spentAt)) {
        return res.status(400).json({ error: 'Invalid spentAt date' });
      }

      const user = await findById(User, userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const expense = await Expense.create({
        spentAt,
        title,
        amount,
        userId: user.id,
        category,
        note,
      });

      return res.status(201).json(expense);
    }),
  );

  app.get(
    '/expenses',
    asyncHandler(async (req, res) => {
      const { userId, from, to, categories } = req.query;
      const where = {};

      if (userId !== undefined) {
        const parsedUserId = parseId(userId);

        if (parsedUserId === null) {
          return res.status(400).json({ error: 'Invalid userId' });
        }

        where.userId = parsedUserId;
      }

      if (from !== undefined || to !== undefined) {
        if (
          (from !== undefined && !isValidDate(from)) ||
          (to !== undefined && !isValidDate(to))
        ) {
          return res.status(400).json({ error: 'Invalid date range' });
        }

        where.spentAt = {};

        if (from !== undefined) {
          where.spentAt[Op.gte] = new Date(from);
        }

        if (to !== undefined) {
          where.spentAt[Op.lte] = new Date(to);
        }
      }

      if (categories !== undefined) {
        const categoryList = String(categories)
          .split(',')
          .map((category) => category.trim())
          .filter(Boolean);

        if (categoryList.length > 0) {
          where.category = { [Op.in]: categoryList };
        }
      }

      const expenses = await Expense.findAll({
        where,
        order: [['id', 'ASC']],
      });

      return res.status(200).json(expenses);
    }),
  );

  app.get(
    '/expenses/:id',
    asyncHandler(async (req, res) => {
      const expense = await findById(Expense, req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      return res.status(200).json(expense);
    }),
  );

  app.patch(
    '/expenses/:id',
    asyncHandler(async (req, res) => {
      const expense = await findById(Expense, req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      const body = req.body || {};
      const allowedFields = [
        'spentAt',
        'title',
        'amount',
        'userId',
        'category',
        'note',
      ];
      const updates = {};

      for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(body, field)) {
          updates[field] = body[field];
        }
      }

      for (const field of ['spentAt', 'title', 'amount', 'userId']) {
        if (
          Object.prototype.hasOwnProperty.call(updates, field) &&
          isMissing(updates[field])
        ) {
          return res.status(400).json({ error: `${field} is required` });
        }
      }

      if (updates.spentAt !== undefined && !isValidDate(updates.spentAt)) {
        return res.status(400).json({ error: 'Invalid spentAt date' });
      }

      if (updates.userId !== undefined) {
        const user = await findById(User, updates.userId);

        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }

        updates.userId = user.id;
      }

      await expense.update(updates);

      return res.status(200).json(expense);
    }),
  );

  app.delete(
    '/expenses/:id',
    asyncHandler(async (req, res) => {
      const expense = await findById(Expense, req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      await expense.destroy();

      return res.status(204).send();
    }),
  );

  app.use((error, _req, res, next) => {
    if (
      error instanceof SyntaxError &&
      error.status === 400 &&
      'body' in error
    ) {
      return res.status(400).json({ error: 'Invalid JSON' });
    }

    if (res.headersSent) {
      return next(error);
    }

    return res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};

module.exports = {
  createServer,
};
