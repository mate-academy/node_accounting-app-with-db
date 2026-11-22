'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { models } = require('./models/models');

const { User, Expense } = models;

const formatUser = (user) => ({
  id: user.publicId,
  name: user.name,
});

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const isValidId = (id) => /^\d+$/.test(String(id));

const isValidUuid = (id) =>
  /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(String(id));

const isValidUserId = (id) => isValidUuid(id) || isValidId(id);

const findUserById = async (id) => {
  if (isValidUuid(id)) {
    return User.findOne({
      where: { publicId: id },
    });
  }

  if (isValidId(id)) {
    return User.findByPk(id);
  }

  return null;
};

const hasValue = (value) => value !== undefined && value !== null;

const isValidAmount = (value) =>
  (typeof value === 'number' ||
    (typeof value === 'string' && value.trim() !== '')) &&
  Number.isFinite(Number(value));

const isValidOptionalText = (value) =>
  value === undefined || value === null || typeof value === 'string';

const isValidDate = (value) =>
  hasValue(value) && Number.isFinite(new Date(value).getTime());

const createServer = () => {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.use(express.json());

  app.post(
    '/users',
    asyncHandler(async (req, res) => {
      const { name } = req.body || {};

      if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const user = await User.create({ name: name.trim() });

      return res.status(201).json(formatUser(user));
    }),
  );

  app.get(
    '/users',
    asyncHandler(async (req, res) => {
      const users = await User.findAll();

      return res.status(200).json(users.map(formatUser));
    }),
  );

  app.get(
    '/users/:id',
    asyncHandler(async (req, res) => {
      if (!isValidUuid(req.params.id)) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = await User.findOne({
        where: { publicId: req.params.id },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(formatUser(user));
    }),
  );

  app.patch(
    '/users/:id',
    asyncHandler(async (req, res) => {
      if (!isValidUuid(req.params.id)) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = await User.findOne({
        where: { publicId: req.params.id },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { name } = req.body || {};

      if (name !== undefined) {
        if (typeof name !== 'string' || !name.trim()) {
          return res.status(400).json({
            error: 'Name must not be empty',
          });
        }

        await user.update({ name: name.trim() });
      }

      return res.status(200).json(formatUser(user));
    }),
  );

  app.delete(
    '/users/:id',
    asyncHandler(async (req, res) => {
      if (!isValidUuid(req.params.id)) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = await User.findOne({
        where: { publicId: req.params.id },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      return res.status(204).end();
    }),
  );

  app.post(
    '/expenses',
    asyncHandler(async (req, res) => {
      const body = req.body || {};

      const { spentAt, title, amount, userId, category, note } = body;

      if (
        !hasValue(spentAt) ||
        !hasValue(title) ||
        !hasValue(amount) ||
        !hasValue(userId)
      ) {
        return res.status(400).json({
          error: 'Required fields are missing',
        });
      }

      if (
        typeof title !== 'string' ||
        !title.trim() ||
        !isValidAmount(amount) ||
        !isValidDate(spentAt) ||
        !isValidUserId(userId)
      ) {
        return res.status(400).json({
          error: 'Invalid expense data',
        });
      }

      if (!isValidOptionalText(category) || !isValidOptionalText(note)) {
        return res.status(400).json({
          error: 'Invalid category or note',
        });
      }

      const user = await findUserById(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const expense = await Expense.create({
        spentAt,
        title: title.trim(),
        amount: Number(amount),
        userId: user.id,
        category: category ?? null,
        note: note ?? null,
      });

      return res.status(201).json(expense);
    }),
  );

  app.get(
    '/expenses',
    asyncHandler(async (req, res) => {
      const where = {};

      if (req.query.userId !== undefined) {
        if (!isValidUserId(req.query.userId)) {
          return res.status(400).json({ error: 'Invalid userId' });
        }

        const user = await findUserById(req.query.userId);

        if (!user) {
          return res.status(200).json([]);
        }

        where.userId = user.id;
      }

      if (req.query.from || req.query.to) {
        const spentAt = {};

        if (req.query.from) {
          const from = new Date(req.query.from);

          if (!isValidDate(from)) {
            return res.status(400).json({
              error: 'Invalid from date',
            });
          }

          spentAt[Op.gte] = from;
        }

        if (req.query.to) {
          const to = new Date(req.query.to);

          if (!isValidDate(to)) {
            return res.status(400).json({
              error: 'Invalid to date',
            });
          }

          spentAt[Op.lte] = to;
        }

        where.spentAt = spentAt;
      }

      if (req.query.categories !== undefined) {
        const categories = String(req.query.categories)
          .split(',')
          .map((category) => category.trim())
          .filter(Boolean);

        if (categories.length > 0) {
          where.category = {
            [Op.in]: categories,
          };
        }
      }

      const expenses = await Expense.findAll({ where });

      return res.status(200).json(expenses);
    }),
  );

  app.get(
    '/expenses/:id',
    asyncHandler(async (req, res) => {
      if (!isValidId(req.params.id)) {
        return res.status(404).json({
          error: 'Expense not found',
        });
      }

      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({
          error: 'Expense not found',
        });
      }

      return res.status(200).json(expense);
    }),
  );

  app.patch(
    '/expenses/:id',
    asyncHandler(async (req, res) => {
      if (!isValidId(req.params.id)) {
        return res.status(404).json({
          error: 'Expense not found',
        });
      }

      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({
          error: 'Expense not found',
        });
      }

      const body = req.body || {};
      const updates = {};

      const allowedFields = [
        'spentAt',
        'title',
        'amount',
        'userId',
        'category',
        'note',
      ];

      for (const field of allowedFields) {
        if (body[field] !== undefined) {
          updates[field] = body[field];
        }
      }

      if (updates.title !== undefined) {
        if (typeof updates.title !== 'string' || !updates.title.trim()) {
          return res.status(400).json({
            error: 'Title must not be empty',
          });
        }

        updates.title = updates.title.trim();
      }

      if (updates.amount !== undefined) {
        if (!isValidAmount(updates.amount)) {
          return res.status(400).json({
            error: 'Invalid amount',
          });
        }

        updates.amount = Number(updates.amount);
      }

      if (updates.spentAt !== undefined) {
        if (!isValidDate(updates.spentAt)) {
          return res.status(400).json({
            error: 'Invalid spentAt date',
          });
        }
      }

      for (const field of ['category', 'note']) {
        if (
          updates[field] !== undefined &&
          !isValidOptionalText(updates[field])
        ) {
          return res.status(400).json({
            error: `Invalid ${field}`,
          });
        }
      }

      if (updates.userId !== undefined) {
        if (!isValidUserId(updates.userId)) {
          return res.status(400).json({
            error: 'Invalid userId',
          });
        }

        const user = await findUserById(updates.userId);

        if (!user) {
          return res.status(400).json({
            error: 'User not found',
          });
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
      if (!isValidId(req.params.id)) {
        return res.status(404).json({
          error: 'Expense not found',
        });
      }

      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({
          error: 'Expense not found',
        });
      }

      await expense.destroy();

      return res.status(204).end();
    }),
  );

  app.use((req, res) => {
    return res.status(404).json({ error: 'Not found' });
  });

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ error: 'Invalid JSON' });
    }

    return res.status(500).json({
      error: 'Internal server error',
    });
  });

  return app;
};

module.exports = {
  createServer,
};
