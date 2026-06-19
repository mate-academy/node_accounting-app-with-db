'use strict';

const express = require('express');
const { models } = require('./models/models');
const { User, Expense, Category } = models;
const { Op, ValidationError, UniqueConstraintError } = require('sequelize');

function createServer() {
  const app = express();

  app.use(express.json());

  // --- users ---

  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll({ attributes: ['id', 'name'] });

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const newUser = await User.create({ name });

      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/users/:userId', async (req, res) => {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    try {
      const user = await User.findByPk(userId, { attributes: ['id', 'name'] });

      if (!user) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/users/:userId', async (req, res) => {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    try {
      const result = await User.destroy({ where: { id: userId } });

      if (result === 0) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.patch('/users/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    const { name } = req.body;

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const [updatedCount] = await User.update(
        { name },
        { where: { id: userId } },
      );

      if (updatedCount === 0) {
        return res.status(404).json({ error: 'Not found' });
      }

      const updatedUser = await User.findByPk(userId, {
        attributes: ['id', 'name'],
      });

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // --- expenses ---

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (from) {
      where.spentAt = { ...(where.spentAt || {}), [Op.gte]: from };
    }

    if (to) {
      where.spentAt = { ...(where.spentAt || {}), [Op.lte]: to };
    }

    if (categories) {
      const cats = categories.split(',').map((c) => c.trim());

      where.category = { [Op.in]: cats };
    }

    try {
      const expenses = await Expense.findAll({ where });

      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount } = req.body;
    const category = req.body.category || null;
    const note = req.body.note || null;

    const userIm = await User.findByPk(userId, { attributes: ['id', 'name'] });

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !userIm
    ) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    try {
      const newExpense = await Expense.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });

      res.status(201).json(newExpense);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/expenses/:expenseId', async (req, res) => {
    const expenseId = Number(req.params.expenseId);

    if (!Number.isInteger(expenseId) || expenseId <= 0) {
      return res.status(400).json({ error: 'Invalid expenseId' });
    }

    try {
      const expense = await Expense.findByPk(expenseId);

      if (!expense) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.status(200).json(expense);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.patch('/expenses/:expenseId', async (req, res) => {
    const expenseId = Number(req.params.expenseId);

    if (!Number.isInteger(expenseId) || expenseId <= 0) {
      return res.status(400).json({ error: 'Invalid expenseId' });
    }

    const allowedFields = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    try {
      const [updatedCount] = await Expense.update(updates, {
        where: { id: expenseId },
      });

      if (updatedCount === 0) {
        return res.status(404).json({ error: 'Not found' });
      }

      const updatedExpense = await Expense.findByPk(expenseId);

      res.status(200).json(updatedExpense);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/expenses/:expenseId', async (req, res) => {
    const expenseId = Number(req.params.expenseId);

    if (!Number.isInteger(expenseId) || expenseId <= 0) {
      return res.status(400).json({ error: 'Invalid expenseId' });
    }

    try {
      const expense = await Expense.destroy({ where: { id: expenseId } });

      if (!expense) {
        return res.status(404).json({ error: 'Not found' });
      }

      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // --- categories ---

  app.get('/categories', async (req, res) => {
    try {
      const categories = await Category.findAll();

      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const newCategory = await Category.create({ name });

      res.status(201).json(newCategory);
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ error: 'Category name must be unique' });
      }

      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/categories/:categoryId', async (req, res) => {
    const categoryId = Number(req.params.categoryId);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({ error: 'Invalid categoryId' });
    }

    try {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.patch('/categories/:categoryId', async (req, res) => {
    const categoryId = Number(req.params.categoryId);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({ error: 'Invalid categoryId' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const [updated] = await Category.update(
        { name },
        { where: { id: categoryId } },
      );

      if (updated === 0) {
        return res.status(404).json({ error: 'Not found' });
      }

      const updatedCategory = await Category.findByPk(categoryId);

      res.status(200).json(updatedCategory);
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ error: 'Category name must be unique' });
      }

      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/categories/:categoryId', async (req, res) => {
    const categoryId = Number(req.params.categoryId);

    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return res.status(400).json({ error: 'Invalid categoryId' });
    }

    try {
      const deleted = await Category.destroy({ where: { id: categoryId } });

      if (!deleted) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return app;
}

module.exports = {
  createServer,
};
