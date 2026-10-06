'use strict';

const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const { models } = require('./models/models');

const { User, Expense } = models;

function handleAsync(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function isValidName(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidExpense(data) {
  return (
    Number.isInteger(data.userId) &&
    data.userId > 0 &&
    isValidName(data.title) &&
    data.spentAt !== null &&
    data.spentAt !== undefined &&
    Number.isFinite(new Date(data.spentAt).getTime()) &&
    typeof data.amount === 'number' &&
    Number.isFinite(data.amount) &&
    (data.category === undefined ||
      data.category === null ||
      typeof data.category === 'string') &&
    (data.note === undefined ||
      data.note === null ||
      typeof data.note === 'string')
  );
}

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.param('id', (req, res, next, id) => {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      res.status(404).json({ message: 'Record not found' });

      return;
    }

    next();
  });

  app.get(
    '/users',
    handleAsync(async (req, res) => {
      const users = await User.findAll({
        order: [['id', 'ASC']],
      });

      res.json(users);
    }),
  );

  app.post(
    '/users',
    handleAsync(async (req, res) => {
      const { name } = req.body || {};

      if (!isValidName(name)) {
        res.status(400).json({ message: 'Name is required' });

        return;
      }

      const user = await User.create({ name });

      res.status(201).json(user);
    }),
  );

  app.get(
    '/users/:id',
    handleAsync(async (req, res) => {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });

        return;
      }

      res.json(user);
    }),
  );

  app.patch(
    '/users/:id',
    handleAsync(async (req, res) => {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });

        return;
      }

      const { name } = req.body || {};

      if (!isValidName(name)) {
        res.status(400).json({ message: 'Name is required' });

        return;
      }

      await user.update({ name });

      res.json(user);
    }),
  );

  app.delete(
    '/users/:id',
    handleAsync(async (req, res) => {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });

        return;
      }

      await user.destroy();

      res.status(204).end();
    }),
  );

  app.get(
    '/expenses',
    handleAsync(async (req, res) => {
      const { userId, from, to, categories } = req.query;
      const where = {};

      if (userId !== undefined) {
        if (!Number.isInteger(Number(userId)) || Number(userId) <= 0) {
          res.status(400).json({ message: 'Invalid userId' });

          return;
        }

        where.userId = Number(userId);
      }

      if (from !== undefined || to !== undefined) {
        where.spentAt = {};

        if (from !== undefined) {
          const fromDate = new Date(from);

          if (!Number.isFinite(fromDate.getTime())) {
            res.status(400).json({ message: 'Invalid from date' });

            return;
          }

          where.spentAt[Op.gte] = fromDate;
        }

        if (to !== undefined) {
          const toDate = new Date(to);

          if (!Number.isFinite(toDate.getTime())) {
            res.status(400).json({ message: 'Invalid to date' });

            return;
          }

          where.spentAt[Op.lte] = toDate;
        }
      }

      if (categories !== undefined) {
        const categoryList = []
          .concat(categories)
          .flatMap((value) => String(value).split(','))
          .map((value) => value.trim());

        where.category = {
          [Op.in]: categoryList,
        };
      }

      const expenses = await Expense.findAll({
        where,
        order: [['id', 'ASC']],
      });

      res.json(expenses);
    }),
  );

  app.post(
    '/expenses',
    handleAsync(async (req, res) => {
      const { userId, spentAt, title, amount, category, note } = req.body || {};

      const data = {
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      };

      if (!isValidExpense(data)) {
        res.status(400).json({ message: 'Invalid expense data' });

        return;
      }

      const user = await User.findByPk(userId);

      if (!user) {
        res.status(400).json({ message: 'User not found' });

        return;
      }

      const expense = await Expense.create(data);

      res.status(201).json(expense);
    }),
  );

  app.get(
    '/expenses/:id',
    handleAsync(async (req, res) => {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        res.status(404).json({ message: 'Expense not found' });

        return;
      }

      res.json(expense);
    }),
  );

  app.patch(
    '/expenses/:id',
    handleAsync(async (req, res) => {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        res.status(404).json({ message: 'Expense not found' });

        return;
      }

      const body = req.body || {};
      const changes = {};
      const fields = [
        'userId',
        'spentAt',
        'title',
        'amount',
        'category',
        'note',
      ];

      for (const field of fields) {
        if (Object.prototype.hasOwnProperty.call(body, field)) {
          changes[field] = body[field];
        }
      }

      const updatedData = {
        ...expense.toJSON(),
        ...changes,
      };

      if (!isValidExpense(updatedData)) {
        res.status(400).json({ message: 'Invalid expense data' });

        return;
      }

      const user = await User.findByPk(updatedData.userId);

      if (!user) {
        res.status(400).json({ message: 'User not found' });

        return;
      }

      await expense.update(changes);

      res.json(expense);
    }),
  );

  app.delete(
    '/expenses/:id',
    handleAsync(async (req, res) => {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        res.status(404).json({ message: 'Expense not found' });

        return;
      }

      await expense.destroy();

      res.status(204).end();
    }),
  );

  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) {
      next(error);

      return;
    }

    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError' ||
      error.name === 'SequelizeForeignKeyConstraintError' ||
      error.status === 400
    ) {
      res.status(400).json({ message: 'Invalid request data' });

      return;
    }

    res.status(500).json({ message: 'Internal server error' });
  });

  return app;
}

module.exports = {
  createServer,
};
