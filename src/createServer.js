'use strict';

const express = require('express');
const { Op } = require('sequelize');

const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Category } = require('./models/Category.model');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  const formatExpense = (expense) => {
    const data = expense.toJSON();
    const result = {
      id: data.id,
      spentAt: data.spentAt,
      title: data.title,
      amount: data.amount,
      userId: data.userId,
    };

    if (data.Category?.name) {
      result.category = data.Category.name;
    }

    if (data.note !== undefined && data.note !== null) {
      result.note = data.note;
    }

    return result;
  };

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name required' });
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Expense.destroy({
      where: { userId: req.params.id },
    });

    await user.destroy();

    res.sendStatus(204);
  });

  const updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    await user.update({ name });

    return res.json(user);
  };

  app.put('/users/:id', updateUser);
  app.patch('/users/:id', updateUser);

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name required' });
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  });

  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.json(categories);
  });

  app.get('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();

    res.sendStatus(204);
  });

  app.put('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name required' });
    }

    await category.update({ name });

    return res.json(category);
  });

  app.post('/expenses', async (req, res) => {
    let { title } = req.body;
    const { spentAt, amount, userId, note } = req.body;
    const rawCategoryId = req.body.categoryId;
    const rawCategory = req.body.category;

    if (!spentAt || !title || !amount || !userId) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    title = title.trim();

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    let category = null;

    if (rawCategoryId) {
      category = await Category.findByPk(rawCategoryId);
    } else if (rawCategory) {
      [category] = await Category.findOrCreate({
        where: { name: String(rawCategory).trim() },
        defaults: { name: String(rawCategory).trim() },
      });
    } else {
      [category] = await Category.findOrCreate({
        where: { name: 'Uncategorized' },
        defaults: { name: 'Uncategorized' },
      });
    }

    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const createdExpense = await Expense.create({
      spentAt,
      title,
      amount,
      userId,
      categoryId: category.id,
      note,
    });

    const expense = await Expense.findByPk(createdExpense.id, {
      include: [{ model: Category }],
    });

    res.status(201).json(formatExpense(expense));
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (from && to) {
      where.spentAt = {
        [Op.between]: [from, to],
      };
    } else if (from) {
      where.spentAt = {
        [Op.gte]: from,
      };
    } else if (to) {
      where.spentAt = {
        [Op.lte]: to,
      };
    }

    const include = [{ model: Category }];

    if (categories) {
      include[0].where = {
        name: {
          [Op.in]: String(categories)
            .split(',')
            .map((value) => value.trim()),
        },
      };
      include[0].required = true;
    }

    const expenses = await Expense.findAll({
      where,
      include,
      order: [['id', 'ASC']],
    });

    res.json(expenses.map(formatExpense));
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id, {
      include: [{ model: Category }],
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(formatExpense(expense));
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    let { title } = req.body;
    const { spentAt, amount, note } = req.body;
    const rawCategoryId = req.body.categoryId;
    const rawCategory = req.body.category;

    if (title) {
      title = title.trim();
    }

    let nextCategoryId = expense.categoryId;

    if (rawCategoryId) {
      const category = await Category.findByPk(rawCategoryId);

      if (!category) {
        return res.status(400).json({ message: 'Category not found' });
      }

      nextCategoryId = category.id;
    } else if (rawCategory) {
      const [category] = await Category.findOrCreate({
        where: { name: String(rawCategory).trim() },
        defaults: { name: String(rawCategory).trim() },
      });

      nextCategoryId = category.id;
    }

    await expense.update({
      spentAt,
      title,
      amount,
      categoryId: nextCategoryId,
      note,
    });

    const updatedExpense = await Expense.findByPk(req.params.id, {
      include: [{ model: Category }],
    });

    res.json(formatExpense(updatedExpense));
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();

    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
