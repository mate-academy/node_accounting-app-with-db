'use strict';

const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const { models } = require('./models/models');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const cleanExpense = (expenseInstance) => {
    const json = expenseInstance.toJSON();

    if (json.Category) {
      json.category = json.Category.name;
    }

    delete json.Category;
    delete json.categoryId;

    return json;
  };

  app.get('/users', async (req, res) => {
    const users = await models.User.findAll();

    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const newUser = await models.User.create({ name });

    res.status(201).json(newUser);
  });

  app.get('/users/:userId', async (req, res) => {
    const user = await models.User.findByPk(req.params.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.json(user);
  });

  app.patch('/users/:userId', async (req, res) => {
    const user = await models.User.findByPk(req.params.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    if (req.body.name) {
      user.name = req.body.name;
      await user.save();
    }

    res.status(200).json(user);
  });

  app.delete('/users/:userId', async (req, res) => {
    const user = await models.User.findByPk(req.params.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    await user.destroy();
    res.status(204).end();
  });

  app.get('/categories', async (req, res) => {
    const categories = await models.Category.findAll();

    res.json(categories);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const newCategory = await models.Category.create({ name });

    res.status(201).json(newCategory);
  });

  app.patch('/categories/:categoryId', async (req, res) => {
    const category = await models.Category.findByPk(req.params.categoryId);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });

      return;
    }

    if (req.body.name) {
      category.name = req.body.name;
      await category.save();
    }
    res.status(200).json(category);
  });

  app.delete('/categories/:categoryId', async (req, res) => {
    const category = await models.Category.findByPk(req.params.categoryId);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });

      return;
    }
    await category.destroy();
    res.status(204).end();
  });

  app.get('/expenses', async (req, res) => {
    const where = {};
    const include = [
      {
        model: models.Category,
        attributes: ['name', 'id'],
      },
    ];

    if (req.query.userId) {
      where.userId = Number(req.query.userId);
    }

    if (req.query.categories) {
      const categoriesToMatch = Array.isArray(req.query.categories)
        ? req.query.categories
        : [req.query.categories];

      include[0].where = {
        name: { [Op.in]: categoriesToMatch },
      };
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

    const expenses = await models.Expense.findAll({
      where,
      include,
    });

    res.json(expenses.map(cleanExpense));
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    let { categoryId } = req.body;

    if (!userId || !spentAt || !title || amount === undefined) {
      res.status(400).json({ message: 'Missing required fields' });

      return;
    }

    const user = await models.User.findByPk(userId);

    if (!user) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    if (!categoryId && category) {
      const [catInstance] = await models.Category.findOrCreate({
        where: { name: category },
        defaults: { name: category },
      });

      categoryId = catInstance.id;
    }

    const newExpense = await models.Expense.create({
      userId,
      spentAt,
      title,
      amount,
      categoryId: categoryId || null,
      note: note || null,
    });

    const responseData = newExpense.toJSON();

    if (category) {
      responseData.category = category;
    }

    delete responseData.categoryId;

    res.status(201).json(responseData);
  });

  app.get('/expenses/:expenseId', async (req, res) => {
    const expense = await models.Expense.findByPk(req.params.expenseId, {
      include: [models.Category],
    });

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.json(cleanExpense(expense));
  });

  app.patch('/expenses/:expenseId', async (req, res) => {
    const expense = await models.Expense.findByPk(req.params.expenseId);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    const allowedUpdates = ['spentAt', 'title', 'amount', 'categoryId', 'note'];

    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) {
        expense[key] = req.body[key];
      }
    });

    await expense.save();

    const reloaded = await expense.reload({ include: [models.Category] });

    res.status(200).json(cleanExpense(reloaded));
  });

  app.delete('/expenses/:expenseId', async (req, res) => {
    const expense = await models.Expense.findByPk(req.params.expenseId);

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    await expense.destroy();
    res.status(204).end();
  });

  return app;
};

module.exports = {
  createServer,
};
