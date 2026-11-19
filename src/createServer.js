'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

const NIL_UUID = '00000000-0000-0000-0000-000000000000';
const uuidPattern = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

// users: UUID
const parseUuid = (value) => (uuidPattern.test(String(value)) ? value : null);

// expenses: integer
const parseId = (value) => {
  const id = Number(value);

  return Number.isInteger(id) && id > 0 ? id : null;
};

const isBlank = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '');

const isValidDate = (value) => !Number.isNaN(new Date(value).getTime());

const wrap = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const createServer = () => {
  const app = express();

  app.use(express.json());

  // ---------- Users ----------

  app.post(
    '/users',
    wrap(async (req, res) => {
      const { name } = req.body || {};

      if (isBlank(name) || typeof name !== 'string') {
        return res.sendStatus(400);
      }

      const user = await User.create({ name });

      res.status(201).json(user);
    }),
  );

  app.get(
    '/users',
    wrap(async (req, res) => {
      const users = await User.findAll();

      res.status(200).json(users);
    }),
  );

  app.get(
    '/users/:id',
    wrap(async (req, res) => {
      const id = parseUuid(req.params.id);
      const user = id ? await User.findByPk(id) : null;

      if (!user) {
        return res.sendStatus(404);
      }

      res.status(200).json(user);
    }),
  );

  app.patch(
    '/users/:id',
    wrap(async (req, res) => {
      const id = parseUuid(req.params.id);
      const user = id ? await User.findByPk(id) : null;

      if (!user) {
        return res.sendStatus(404);
      }

      const { name } = req.body || {};

      if (name !== undefined) {
        if (isBlank(name) || typeof name !== 'string') {
          return res.sendStatus(400);
        }

        user.name = name;
        await user.save();
      }

      res.status(200).json(user);
    }),
  );

  app.delete(
    '/users/:id',
    wrap(async (req, res) => {
      const id = parseUuid(req.params.id);
      const user = id ? await User.findByPk(id) : null;

      if (!user) {
        return res.sendStatus(404);
      }

      await Expense.destroy({ where: { userId: user.id } });
      await user.destroy();

      res.sendStatus(204);
    }),
  );

  // ---------- Expenses ----------

  app.post(
    '/expenses',
    wrap(async (req, res) => {
      const { spentAt, title, amount, userId, category, note } = req.body || {};

      if (
        isBlank(spentAt) ||
        isBlank(title) ||
        isBlank(amount) ||
        isBlank(userId)
      ) {
        return res.sendStatus(400);
      }

      if (!isValidDate(spentAt) || Number.isNaN(Number(amount))) {
        return res.sendStatus(400);
      }

      const uid = parseUuid(userId);
      const user = uid ? await User.findByPk(uid) : null;

      if (!user) {
        return res.sendStatus(400);
      }

      const expense = await Expense.create({
        spentAt,
        title,
        amount: Number(amount),
        userId: uid,
        category,
        note,
      });

      res.status(201).json(expense);
    }),
  );

  app.get(
    '/expenses',
    wrap(async (req, res) => {
      const { userId, from, to, categories } = req.query;
      const where = {};

      if (userId !== undefined) {
        where.userId = parseUuid(userId) || NIL_UUID;
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
        where.category = {
          [Op.in]: String(categories)
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean),
        };
      }

      const expenses = await Expense.findAll({ where });

      res.status(200).json(expenses);
    }),
  );

  app.get(
    '/expenses/:id',
    wrap(async (req, res) => {
      const id = parseId(req.params.id);
      const expense = id ? await Expense.findByPk(id) : null;

      if (!expense) {
        return res.sendStatus(404);
      }

      res.status(200).json(expense);
    }),
  );

  app.patch(
    '/expenses/:id',
    wrap(async (req, res) => {
      const id = parseId(req.params.id);
      const expense = id ? await Expense.findByPk(id) : null;

      if (!expense) {
        return res.sendStatus(404);
      }

      const allowed = ['spentAt', 'title', 'amount', 'category', 'note'];
      const updates = {};

      for (const key of allowed) {
        if (req.body && req.body[key] !== undefined) {
          updates[key] = req.body[key];
        }
      }

      if (updates.spentAt !== undefined && !isValidDate(updates.spentAt)) {
        return res.sendStatus(400);
      }

      if (updates.amount !== undefined) {
        if (Number.isNaN(Number(updates.amount))) {
          return res.sendStatus(400);
        }
        updates.amount = Number(updates.amount);
      }

      if (updates.title !== undefined && isBlank(updates.title)) {
        return res.sendStatus(400);
      }

      await expense.update(updates);

      res.status(200).json(expense);
    }),
  );

  app.delete(
    '/expenses/:id',
    wrap(async (req, res) => {
      const id = parseId(req.params.id);
      const expense = id ? await Expense.findByPk(id) : null;

      if (!expense) {
        return res.sendStatus(404);
      }

      await expense.destroy();

      res.sendStatus(204);
    }),
  );

  // ---------- Errors ----------

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.sendStatus(400);
    }

    res.sendStatus(500);
  });

  return app;
};

module.exports = {
  createServer,
};
