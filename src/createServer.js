'use strict';

const cors = require('cors');
const express = require('express');
const path = require('path');
const { Op } = require('sequelize');
const {
  models: { User, Expense },
} = require('./models/models');

const createServer = () => {
  const app = express();
  const usersRouter = express.Router();
  const expensesRouter = express.Router();

  app.use(cors());
  app.use(express.json());

  // --- Users ---

  usersRouter.post('/', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  usersRouter.get('/', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  usersRouter.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  usersRouter.patch('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update(req.body);

    res.json(user);
  });

  usersRouter.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(204).send();
  });

  // --- Expenses ---

  expensesRouter.post('/', async (req, res) => {
    const { userId, spentAt, title, amount } = req.body;

    if (!userId || !spentAt || !title || amount === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const expense = await Expense.create(req.body);

    res.status(201).json(expense);
  });

  expensesRouter.get('/', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId !== undefined) {
      where.userId = Number(userId);
    }

    if (from !== undefined || to !== undefined) {
      where.spentAt = {};

      if (from !== undefined) {
        where.spentAt[Op.gte] = new Date(from);
      }

      if (to !== undefined) {
        where.spentAt[Op.lte] = new Date(to);
      }
    }

    if (categories !== undefined) {
      where.category = { [Op.in]: categories.split(',') };
    }

    const expenses = await Expense.findAll({ where });

    res.json(expenses);
  });

  expensesRouter.get('/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  });

  expensesRouter.patch('/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.update(req.body);

    res.json(expense);
  });

  expensesRouter.delete('/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();

    res.status(204).send();
  });

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'page.html'));
  });

  return app;
};

module.exports = {
  createServer,
};
