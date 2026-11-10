'use strict';
/* eslint-disable */

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db');
const { Op } = require('sequelize');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Category } = require('./models/Category.model');

const createServer = async () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));

  // Test database connection
  try {
    await sequelize.authenticate();

    // Sync models with database
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }

  app.get('/users', async (req, res) => {
    try {
      const allUsers = await User.findAll();

      res.status(200).json(allUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

  app.post('/users', async (req, res) => {
    try {
      const { name } = req.body;

      if (typeof name !== 'string' || name.trim() === '') {
        return res.sendStatus(400);
      }

      const newUser = await User.create({ name: name });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  });

  app.get('/users/:userId', async (req, res) => {
    try {
      const id = Number(req.params.userId);

      if (Number.isNaN(id)) {
        return res.sendStatus(400);
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user' });
    }
  });

  app.delete('/users/:userId', async (req, res) => {
    try {
      const id = Number(req.params.userId);

      if (Number.isNaN(id)) {
        return res.sendStatus(400);
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await User.destroy({ where: { id } });

      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  });

  app.patch('/users/:userId', async (req, res) => {
    try {
      const id = Number(req.params.userId);

      if (Number.isNaN(id)) {
        return res.sendStatus(400);
      }

      const { name } = req.body;

      if (
        name !== undefined &&
        (typeof name !== 'string' || name.trim() === '')
      ) {
        return res.sendStatus(400);
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (name !== undefined) {
        user.name = name;
      }

      await user.save();

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user' });
    }
  });

  app.get('/expenses', async (req, res) => {
    try {
      const { userId, categories, from, to, limit, offset } = req.query;

      let userIdNum = null;

      if (userId != null && userId !== '') {
        userIdNum = Number(userId);

        if (Number.isNaN(userIdNum)) {
          return res.sendStatus(400);
        }
      }

      const categoryList = Array.isArray(categories)
        ? categories
        : typeof categories === 'string'
          ? categories
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : [];

      const fromDate = from ? from : null;
      const toDate = to ? to : null;

      // Validate ISO date format
      if ((from && isNaN(new Date(from))) || (to && isNaN(new Date(to)))) {
        return res.status(400).json({ message: 'Invalid date in from/to' });
      }

      const where = {};

      if (userIdNum != null) {
        where.userId = userIdNum;
      }

      if (categoryList.length) {
        where.category = { [Op.in]: categoryList };
      }

      if (fromDate || toDate) {
        where.spentAt = {};

        if (fromDate) {
          where.spentAt[Op.gte] = fromDate;
        }

        if (toDate) {
          where.spentAt[Op.lte] = toDate;
        }
      }

      const rows = await Expense.findAll({
        where,
        order: [['id', 'ASC']],
        ...(limit && !Number.isNaN(Number(limit))
          ? { limit: Number(limit) }
          : {}),
        ...(offset && !Number.isNaN(Number(offset))
          ? { offset: Number(offset) }
          : {}),
      });

      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching expenses' });
    }
  });

  app.post('/expenses', async (req, res) => {
    try {
      const { userId, spentAt, title, amount, category, note } = req.body;

      if (userId === undefined || !spentAt || !title || amount === undefined) {
        return res.sendStatus(400);
      }

      const numericUserId = Number(userId);

      if (Number.isNaN(numericUserId)) {
        return res.sendStatus(400);
      }

      const foundUser = await User.findByPk(numericUserId);

      if (!foundUser) {
        return res.sendStatus(400);
      }

      const newExpense = {
        userId: numericUserId,
        spentAt: spentAt,
        title: title,
        amount: amount,
        category: category,
        ...(note ? { note } : {}),
      };

      const newExpenseJson = await Expense.create(newExpense);

      res.status(201).json(newExpenseJson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating expense' });
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.sendStatus(400);
      }

      const foundExpense = await Expense.findByPk(id);

      if (!foundExpense) {
        return res.sendStatus(404);
      }

      res.status(200).json(foundExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching expense' });
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        return res.sendStatus(400);
      }

      const foundExpense = await Expense.findByPk(id);

      if (!foundExpense) {
        return res.sendStatus(404);
      }

      await Expense.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting expense' });
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { spentAt, title, amount, category, note } = req.body;

      if (Number.isNaN(id)) {
        return res.sendStatus(400);
      }

      const foundExpense = await Expense.findByPk(id);

      if (!foundExpense) {
        return res.sendStatus(404);
      }

      const updates = {
        spentAt,
        title,
        amount,
        category,
        note,
      };

      Object.keys(updates).forEach((key) => {
        if (updates[key] !== undefined) {
          foundExpense[key] = updates[key];
        }
      });

      await foundExpense.save();
      res.status(200).json(foundExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating expense' });
    }
  });

  // Categories CRUD routes
  app.get('/categories', async (req, res) => {
    try {
      const allCategories = await Category.findAll();
      res.status(200).json(allCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching categories' });
    }
  });

  app.post('/categories', async (req, res) => {
    try {
      const { name } = req.body;

      if (typeof name !== 'string' || name.trim() === '') {
        return res.sendStatus(400);
      }

      const newCategory = await Category.create({ name: name.trim() });
      res.status(201).json(newCategory);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res
          .status(400)
          .json({ message: 'Category name already exists' });
      }
      console.error(error);
      res.status(500).json({ message: 'Error creating category' });
    }
  });

  app.get('/categories/:categoryId', async (req, res) => {
    try {
      const id = Number(req.params.categoryId);

      if (Number.isNaN(id)) {
        return res.sendStatus(400);
      }

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching category' });
    }
  });

  app.patch('/categories/:categoryId', async (req, res) => {
    try {
      const id = Number(req.params.categoryId);

      if (Number.isNaN(id)) {
        return res.sendStatus(400);
      }

      const { name } = req.body;

      if (
        name !== undefined &&
        (typeof name !== 'string' || name.trim() === '')
      ) {
        return res.sendStatus(400);
      }

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      if (name !== undefined) {
        category.name = name.trim();
      }

      await category.save();
      res.status(200).json(category);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res
          .status(400)
          .json({ message: 'Category name already exists' });
      }
      console.error(error);
      res.status(500).json({ message: 'Error updating category' });
    }
  });

  app.delete('/categories/:categoryId', async (req, res) => {
    try {
      const id = Number(req.params.categoryId);

      if (Number.isNaN(id)) {
        return res.sendStatus(400);
      }

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      await Category.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting category' });
    }
  });

  return app;
};

module.exports = {
  createServer,
};
