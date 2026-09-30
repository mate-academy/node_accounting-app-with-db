/* eslint-disable handle-callback-err */
'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

// Wraps async route handlers so a rejected promise is forwarded to
// Express's error handler instead of hanging the request.
const catchErrors = (handler) => (req, res, next) => {
  handler(req, res, next).catch(next);
};

function createServer() {
  const app = express();

  app.use(express.json());

  // Explicitly guarantee the required Content-Type on every response,
  // rather than relying on Express's default json serialization behavior.
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  // ==========================================
  // USERS
  // ==========================================

  // Create user
  app.post(
    '/users',
    catchErrors(async (req, res) => {
      const { name } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ error: 'Missing required parameter: name' });
      }

      const newUser = await User.create({ name });

      res.status(201).json(newUser);
    }),
  );

  // Get all users
  app.get(
    '/users',
    catchErrors(async (req, res) => {
      const users = await User.findAll();

      res.json(users);
    }),
  );

  // Get one user
  app.get(
    '/users/:id',
    catchErrors(async (req, res) => {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    }),
  );

  // Update user
  app.patch(
    '/users/:id',
    catchErrors(async (req, res) => {
      const { name } = req.body;

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (name !== undefined) {
        user.name = name;
        await user.save();
      }

      res.json(user);
    }),
  );

  // Delete user
  app.delete(
    '/users/:id',
    catchErrors(async (req, res) => {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      res.status(204).send();
    }),
  );

  // ==========================================
  // EXPENSES
  // ==========================================

  // Create expense
  app.post(
    '/expenses',
    catchErrors(async (req, res) => {
      const { title, amount, category, note, spentAt, userId } = req.body;

      if (
        !title ||
        amount === undefined ||
        !spentAt ||
        userId === undefined ||
        userId === null
      ) {
        return res.status(400).json({
          error: 'Missing required parameters',
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          error: 'User not found',
        });
      }

      const newExpense = await Expense.create({
        title,
        amount: Number(amount),
        category: category !== undefined ? category : null,
        note: note || '',
        spentAt,
        userId: Number(userId),
      });

      res.status(201).json(newExpense);
    }),
  );

  // Get expenses with filters
  app.get(
    '/expenses',
    catchErrors(async (req, res) => {
      const { userId, categories, from, to } = req.query;

      const where = {};

      if (userId) {
        where.userId = Number(userId);
      }

      if (categories) {
        where.category = { [Op.in]: categories.toString().split(',') };
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

      const expenses = await Expense.findAll({ where });

      res.json(expenses);
    }),
  );

  // Get one expense
  app.get(
    '/expenses/:id',
    catchErrors(async (req, res) => {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({
          error: 'Expense not found',
        });
      }

      res.json(expense);
    }),
  );

  // Update expense
  app.patch(
    '/expenses/:id',
    catchErrors(async (req, res) => {
      const { title, amount, category, note, spentAt, userId } = req.body;

      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({
          error: 'Expense not found',
        });
      }

      // Check user if userId was provided
      if (userId !== undefined && userId !== null) {
        const user = await User.findByPk(userId);

        if (!user) {
          return res.status(400).json({
            error: 'User not found',
          });
        }

        expense.userId = Number(userId);
      }

      if (title !== undefined) {
        expense.title = title;
      }

      if (amount !== undefined) {
        expense.amount = Number(amount);
      }

      if (category !== undefined) {
        expense.category = category;
      }

      if (note !== undefined) {
        expense.note = note;
      }

      if (spentAt !== undefined) {
        expense.spentAt = spentAt;
      }

      await expense.save();

      res.json(expense);
    }),
  );

  // Delete expense
  app.delete(
    '/expenses/:id',
    catchErrors(async (req, res) => {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({
          error: 'Expense not found',
        });
      }

      await expense.destroy();

      res.status(204).send();
    }),
  );

  // ==========================================
  // ERROR HANDLING
  // ==========================================
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

module.exports = {
  createServer,
};
