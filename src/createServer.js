'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.post(
    '/users',
    asyncHandler(async (req, res) => {
      const { name } = req.body || {};

      if (!name) {
        return res.status(400).json({ error: 'name is required' });
      }

      const user = await User.create({ name });

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

  app.get(
    '/users/:id',
    asyncHandler(async (req, res) => {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    }),
  );

  app.patch(
    '/users/:id',
    asyncHandler(async (req, res) => {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (Object.prototype.hasOwnProperty.call(req.body || {}, 'name')) {
        await user.update({ name: req.body.name });
      }

      return res.status(200).json(user);
    }),
  );

  app.delete(
    '/users/:id',
    asyncHandler(async (req, res) => {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await Expense.destroy({ where: { userId: user.id } });
      await user.destroy();

      return res.status(204).end();
    }),
  );

  app.post(
    '/expenses',
    asyncHandler(async (req, res) => {
      const { spentAt, title, amount, userId, category, note } = req.body || {};

      if (spentAt == null || !title || amount == null || userId == null) {
        return res.status(400).json({
          error: 'spentAt, title, amount and userId are required',
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const expense = await Expense.create({
        spentAt,
        title,
        amount,
        userId,
        category,
        note,
      });

      return res.status(201).json(expense);
    }),
  );

  app.get(
    '/expenses',
    asyncHandler(async (req, res) => {
      const where = {};

      if (req.query.userId !== undefined) {
        where.userId = req.query.userId;
      }

      if (req.query.from || req.query.to) {
        where.spentAt = {};

        if (req.query.from) {
          where.spentAt[Op.gte] = new Date(req.query.from);
        }

        if (req.query.to) {
          where.spentAt[Op.lte] = new Date(req.query.to);
        }
      }

      if (req.query.categories) {
        const categories = req.query.categories
          .split(',')
          .map((category) => category.trim())
          .filter(Boolean);

        if (categories.length) {
          where.category = { [Op.in]: categories };
        }
      }

      const expenses = await Expense.findAll({ where });

      return res.status(200).json(expenses);
    }),
  );

  app.get(
    '/expenses/:id',
    asyncHandler(async (req, res) => {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      return res.status(200).json(expense);
    }),
  );

  app.patch(
    '/expenses/:id',
    asyncHandler(async (req, res) => {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      const fields = [
        'spentAt',
        'title',
        'amount',
        'userId',
        'category',
        'note',
      ];
      const changes = Object.fromEntries(
        Object.entries(req.body || {}).filter(([key]) => fields.includes(key)),
      );

      if (changes.userId !== undefined) {
        const user = await User.findByPk(changes.userId);

        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
      }

      await expense.update(changes);

      return res.status(200).json(expense);
    }),
  );

  app.delete(
    '/expenses/:id',
    asyncHandler(async (req, res) => {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      await expense.destroy();

      return res.status(204).end();
    }),
  );

  app.use((error, req, res, next) => {
    if (res.headersSent) {
      return next(error);
    }

    return res.status(400).json({ error: error.message });
  });

  return app;
};

module.exports = {
  createServer,
};
