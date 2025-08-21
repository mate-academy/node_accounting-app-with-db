'use strict';

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db');
const { Op } = require('sequelize');
const { models } = require('./models/models');
const { logger } = require('./logger');

const createServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
  });

  // Categories CRUD endpoints
  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await models.Category.findAll({
        where: { isActive: true },
        order: [['name', 'ASC']],
      });

      res.json(categories);
    } catch (error) {
      logger.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/categories/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const category = await models.Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      logger.error('Error fetching category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/categories', async (req, res) => {
    try {
      const { name, description, color } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const existingCategory = await models.Category.findOne({
        where: { name },
      });

      if (existingCategory) {
        return res
          .status(409)
          .json({ error: 'Category with this name already exists' });
      }

      const category = await models.Category.create({
        name,
        description,
        color: color || '#000000',
      });

      res.status(201).json(category);
    } catch (error) {
      logger.error('Error creating category:', error);

      if (error.name === 'SequelizeValidationError') {
        return res
          .status(400)
          .json({ error: 'Validation error', details: error.errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put('/api/categories/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, color, isActive } = req.body;

      const category = await models.Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      if (name && name !== category.name) {
        const existingCategory = await models.Category.findOne({
          where: { name },
        });

        if (existingCategory) {
          return res
            .status(409)
            .json({ error: 'Category with this name already exists' });
        }
      }

      await category.update({
        name: name || category.name,
        description:
          description !== undefined ? description : category.description,
        color: color || category.color,
        isActive: isActive !== undefined ? isActive : category.isActive,
      });

      res.json(category);
    } catch (error) {
      logger.error('Error updating category:', error);

      if (error.name === 'SequelizeValidationError') {
        return res
          .status(400)
          .json({ error: 'Validation error', details: error.errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete('/api/categories/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const category = await models.Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Check if category has associated expenses
      const expenseCount = await models.Expense.count({
        where: { categoryId: id },
      });

      if (expenseCount > 0) {
        return res.status(400).json({
          error: 'Cannot delete category with associated expenses',
          expenseCount,
        });
      }

      await category.destroy();
      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Users CRUD endpoints
  app.get('/api/users', async (req, res) => {
    try {
      const users = await models.User.findAll({
        where: { isActive: true },
        attributes: { exclude: ['password'] },
        order: [['firstName', 'ASC']],
      });

      res.json(users);
    } catch (error) {
      logger.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await models.User.findByPk(id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      logger.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/users', async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const existingUser = await models.User.findOne({ where: { email } });

      if (existingUser) {
        return res
          .status(409)
          .json({ error: 'User with this email already exists' });
      }

      const user = await models.User.create({
        email,
        password, // In production, hash the password
        firstName,
        lastName,
      });

      const { password: _, ...userWithoutPassword } = user.toJSON();

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      logger.error('Error creating user:', error);

      if (error.name === 'SequelizeValidationError') {
        return res
          .status(400)
          .json({ error: 'Validation error', details: error.errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Expenses CRUD endpoints
  app.get('/api/expenses', async (req, res) => {
    try {
      const { userId, categoryId, startDate, endDate } = req.query;
      const where = {};

      if (userId) {
        where.userId = userId;
      }

      if (categoryId) {
        where.categoryId = categoryId;
      }

      if (startDate || endDate) {
        where.date = {};

        if (startDate) {
          where.date[Op.gte] = new Date(startDate);
        }

        if (endDate) {
          where.date[Op.lte] = new Date(endDate);
        }
      }

      const expenses = await models.Expense.findAll({
        where,
        include: [
          {
            model: models.User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
          {
            model: models.Category,
            as: 'category',
            attributes: ['id', 'name', 'color'],
          },
        ],
        order: [['date', 'DESC']],
      });

      res.json(expenses);
    } catch (error) {
      logger.error('Error fetching expenses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/expenses/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const expense = await models.Expense.findByPk(id, {
        include: [
          {
            model: models.User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
          {
            model: models.Category,
            as: 'category',
            attributes: ['id', 'name', 'color'],
          },
        ],
      });

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      res.json(expense);
    } catch (error) {
      logger.error('Error fetching expense:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/expenses', async (req, res) => {
    try {
      const {
        amount,
        description,
        date,
        categoryId,
        userId,
        isRecurring,
        recurringPeriod,
        notes,
      } = req.body;

      if (!amount || !description || !categoryId || !userId) {
        return res.status(400).json({
          error: 'Amount, description, categoryId, and userId are required',
        });
      }

      // Validate that user and category exist
      const user = await models.User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const category = await models.Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      const expense = await models.Expense.create({
        amount,
        description,
        date: date || new Date(),
        categoryId,
        userId,
        isRecurring: isRecurring || false,
        recurringPeriod,
        notes,
      });

      const expenseWithRelations = await models.Expense.findByPk(expense.id, {
        include: [
          {
            model: models.User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
          {
            model: models.Category,
            as: 'category',
            attributes: ['id', 'name', 'color'],
          },
        ],
      });

      res.status(201).json(expenseWithRelations);
    } catch (error) {
      logger.error('Error creating expense:', error);

      if (error.name === 'SequelizeValidationError') {
        return res
          .status(400)
          .json({ error: 'Validation error', details: error.errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put('/api/expenses/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const expense = await models.Expense.findByPk(id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      // Validate category if it's being updated
      if (updateData.categoryId) {
        const category = await models.Category.findByPk(updateData.categoryId);

        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
      }

      await expense.update(updateData);

      const updatedExpense = await models.Expense.findByPk(id, {
        include: [
          {
            model: models.User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email'],
          },
          {
            model: models.Category,
            as: 'category',
            attributes: ['id', 'name', 'color'],
          },
        ],
      });

      res.json(updatedExpense);
    } catch (error) {
      logger.error('Error updating expense:', error);

      if (error.name === 'SequelizeValidationError') {
        return res
          .status(400)
          .json({ error: 'Validation error', details: error.errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete('/api/expenses/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const expense = await models.Expense.findByPk(id);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      await expense.destroy();
      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting expense:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Statistics endpoint
  app.get('/api/statistics', async (req, res) => {
    try {
      const { userId, startDate, endDate } = req.query;
      const where = {};

      if (userId) {
        where.userId = userId;
      }

      if (startDate || endDate) {
        where.date = {};

        if (startDate) {
          where.date[Op.gte] = new Date(startDate);
        }

        if (endDate) {
          where.date[Op.lte] = new Date(endDate);
        }
      }

      const totalExpenses = await models.Expense.sum('amount', { where });
      const expenseCount = await models.Expense.count({ where });

      // Спрощений запит для статистики по категоріях
      const expensesByCategory = await sequelize.query(
        `
          SELECT
            "categoryId",
            SUM(amount) as "totalAmount",
            COUNT(id) as count
          FROM expenses
          WHERE ${userId ? '"userId" = :userId' : '1=1'}
          GROUP BY "categoryId"
          ORDER BY SUM(amount) DESC
        `,
        {
          replacements: { userId: userId || null },
          type: sequelize.QueryTypes.SELECT,
        },
      );

      res.json({
        totalExpenses: parseFloat(totalExpenses) || 0,
        expenseCount,
        expensesByCategory,
      });
    } catch (error) {
      logger.error('Error fetching statistics:', error);

      logger.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });

  return app;
};

module.exports = {
  createServer,
};
