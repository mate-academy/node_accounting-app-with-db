'use strict';

const express = require('express');
const { Op } = require('sequelize');

const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Category } = require('./models/Category');

const createServer = () => {
  const app = express();

  app.use(express.json());

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
      return res.status(400).send('Name required');
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
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
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    await user.update({ name });

    return res.send(user);
  };

  app.put('/users/:id', updateUser);
  app.patch('/users/:id', updateUser);

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name required');
    }

    const category = await Category.create({ name });

    res.status(201).send(category);
  });

  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.send(categories);
  });

  app.get('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    res.send(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    await category.destroy();

    res.sendStatus(204);
  });

  app.put('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).send('Category not found');
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name required');
    }

    await category.update({ name });

    return res.send(category);
  });

  app.post('/expenses', async (req, res) => {
    let { title } = req.body;
    const { spentAt, amount, userId, note } = req.body;
    const rawCategoryId = req.body.categoryId;
    const rawCategory = req.body.category;

    if (!spentAt || !title || !amount || !userId) {
      return res.status(400).send('Missing fields');
    }

    title = title.trim();

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send('User not found');
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
      return res.status(400).send('Category not found');
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

    res.status(201).send(formatExpense(expense));
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

    res.send(expenses.map(formatExpense));
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id, {
      include: [{ model: Category }],
    });

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.send(formatExpense(expense));
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    let { title } = req.body;
    const { spentAt, amount, note } = req.body;
    const rawCategoryId = req.body.categoryId;
    const rawCategory = req.body.category;

    if (title) {
      title = title.trim();
    }

    let nextCategoryId;

    if (rawCategoryId) {
      const category = await Category.findByPk(rawCategoryId);

      if (!category) {
        return res.status(400).send('Category not found');
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

    res.send(formatExpense(updatedExpense));
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    await expense.destroy();

    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
