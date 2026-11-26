'use strict';

const express = require('express');
const { Op } = require('sequelize');

const {
  models: { User, Expense },
} = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(express.json());

  // =========================
  // USERS
  // =========================

  // POST /users — create user
  app.post('/users', async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          message: 'Name is required',
        });
      }

      const user = await User.create({ name });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });

  // GET /users — get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  // GET /users/:id — get one user
  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
  });

  // PATCH /users/:id — update user
  app.patch('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      const { name } = req.body;

      if (name !== undefined) {
        if (!name) {
          return res.status(400).json({
            message: 'Name is required',
          });
        }

        await user.update({ name });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });

  // DELETE /users/:id — delete user
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      await user.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  // =========================
  // EXPENSES
  // =========================

  // POST /expenses — create expense
  app.post('/expenses', async (req, res) => {
    try {
      const { spentAt, title, amount, category, note, userId } = req.body;

      if (
        !spentAt ||
        !title ||
        amount === undefined ||
        amount === null ||
        !userId
      ) {
        return res.status(400).json({
          message: 'Required fields are missing',
        });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          message: 'User not found',
        });
      }

      const expense = await Expense.create({
        spentAt,
        title,
        amount,
        category,
        note,
        userId,
      });

      return res.status(201).json(expense);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });

  // GET /expenses — get expenses with filters
  app.get('/expenses', async (req, res) => {
    try {
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
        where.category = {
          [Op.in]: categories.split(','),
        };
      }

      const expenses = await Expense.findAll({
        where,
        order: [['id', 'ASC']],
      });

      return res.status(200).json(expenses);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });

  // GET /expenses/:id — get one expense
  app.get('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({
          message: 'Expense not found',
        });
      }

      return res.status(200).json(expense);
    } catch (error) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }
  });

  // PATCH /expenses/:id — update expense
  app.patch('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({
          message: 'Expense not found',
        });
      }

      const { spentAt, title, amount, category, note, userId } = req.body;

      if (userId !== undefined) {
        const user = await User.findByPk(userId);

        if (!user) {
          return res.status(400).json({
            message: 'User not found',
          });
        }
      }

      await expense.update({
        ...(spentAt !== undefined && { spentAt }),
        ...(title !== undefined && { title }),
        ...(amount !== undefined && { amount }),
        ...(category !== undefined && { category }),
        ...(note !== undefined && { note }),
        ...(userId !== undefined && { userId }),
      });

      return res.status(200).json(expense);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  });

  // DELETE /expenses/:id — delete expense
  app.delete('/expenses/:id', async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);

      if (!expense) {
        return res.status(404).json({
          message: 'Expense not found',
        });
      }

      await expense.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  return app;
};

module.exports = {
  createServer,
};
