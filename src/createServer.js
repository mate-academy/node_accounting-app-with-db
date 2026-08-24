'use strict';

const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

const isMissing = (value) => value === undefined || value === null;
const isValidId = (id) => /^\d+$/.test(String(id));

const handleRequest = (handler) => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (error) {
    next(error);
  }
};

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.post(
    '/users',
    handleRequest(async (req, res) => {
      const { name } = req.body || {};

      if (isMissing(name) || name === '') {
        res.status(400).json({ message: 'Name is required' });

        return;
      }

      const user = await User.create({ name });

      res.status(201).json(user);
    }),
  );

  app.get(
    '/users',
    handleRequest(async (req, res) => {
      const users = await User.findAll({ order: [['id', 'ASC']] });

      res.json(users);
    }),
  );

  app.get(
    '/users/:id',
    handleRequest(async (req, res) => {
      const user = isValidId(req.params.id)
        ? await User.findByPk(req.params.id)
        : null;

      if (!user) {
        res.status(404).json({ message: 'User not found' });

        return;
      }

      res.json(user);
    }),
  );

  app.patch(
    '/users/:id',
    handleRequest(async (req, res) => {
      const user = isValidId(req.params.id)
        ? await User.findByPk(req.params.id)
        : null;

      if (!user) {
        res.status(404).json({ message: 'User not found' });

        return;
      }

      const { name } = req.body || {};

      if (isMissing(name) || name === '') {
        res.status(400).json({ message: 'Name is required' });

        return;
      }

      await user.update({ name });
      res.json(user);
    }),
  );

  app.delete(
    '/users/:id',
    handleRequest(async (req, res) => {
      const deletedCount = isValidId(req.params.id)
        ? await User.destroy({ where: { id: req.params.id } })
        : 0;

      if (!deletedCount) {
        res.status(404).json({ message: 'User not found' });

        return;
      }

      res.sendStatus(204);
    }),
  );

  app.post(
    '/expenses',
    handleRequest(async (req, res) => {
      const { spentAt, title, amount, category, note, userId } = req.body || {};
      const requiredFields = [spentAt, title, amount, userId];

      if (requiredFields.some(isMissing) || title === '') {
        res.status(400).json({ message: 'Required fields are missing' });

        return;
      }

      const user = isValidId(userId) ? await User.findByPk(userId) : null;

      if (!user) {
        res.status(400).json({ message: 'User not found' });

        return;
      }

      const expense = await Expense.create({
        spentAt,
        title,
        amount,
        category,
        note,
        userId,
      });

      res.status(201).json(expense);
    }),
  );

  app.get(
    '/expenses',
    handleRequest(async (req, res) => {
      const { userId, from, to, categories } = req.query;
      const where = {};

      if (userId !== undefined) {
        where.userId = userId;
      }

      if (from !== undefined || to !== undefined) {
        where.spentAt = {};

        if (from !== undefined) {
          where.spentAt[Op.gte] = from;
        }

        if (to !== undefined) {
          where.spentAt[Op.lte] = to;
        }
      }

      if (categories !== undefined) {
        where.category = {
          [Op.in]: String(categories)
            .split(',')
            .map((category) => category.trim())
            .filter(Boolean),
        };
      }

      const expenses = await Expense.findAll({
        where,
        order: [['id', 'ASC']],
      });

      res.json(expenses);
    }),
  );

  app.get(
    '/expenses/:id',
    handleRequest(async (req, res) => {
      const expense = isValidId(req.params.id)
        ? await Expense.findByPk(req.params.id)
        : null;

      if (!expense) {
        res.status(404).json({ message: 'Expense not found' });

        return;
      }

      res.json(expense);
    }),
  );

  app.patch(
    '/expenses/:id',
    handleRequest(async (req, res) => {
      const expense = isValidId(req.params.id)
        ? await Expense.findByPk(req.params.id)
        : null;

      if (!expense) {
        res.status(404).json({ message: 'Expense not found' });

        return;
      }

      const allowedFields = [
        'spentAt',
        'title',
        'amount',
        'category',
        'note',
        'userId',
      ];
      const updates = Object.fromEntries(
        allowedFields
          .filter((field) => Object.hasOwn(req.body || {}, field))
          .map((field) => [field, req.body[field]]),
      );

      if (
        ['spentAt', 'title', 'amount', 'userId'].some(
          (field) => field in updates && isMissing(updates[field]),
        ) ||
        updates.title === ''
      ) {
        res.status(400).json({ message: 'Required fields cannot be empty' });

        return;
      }

      if ('userId' in updates) {
        const user = isValidId(updates.userId)
          ? await User.findByPk(updates.userId)
          : null;

        if (!user) {
          res.status(400).json({ message: 'User not found' });

          return;
        }
      }

      await expense.update(updates);
      res.json(expense);
    }),
  );

  app.delete(
    '/expenses/:id',
    handleRequest(async (req, res) => {
      const deletedCount = isValidId(req.params.id)
        ? await Expense.destroy({ where: { id: req.params.id } })
        : 0;

      if (!deletedCount) {
        res.status(404).json({ message: 'Expense not found' });

        return;
      }

      res.sendStatus(204);
    }),
  );

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) {
      next(error);

      return;
    }

    res.status(400).json({ message: error.message });
  });

  return app;
};

module.exports = {
  createServer,
};
