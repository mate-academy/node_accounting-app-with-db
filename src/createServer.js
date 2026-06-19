'use strict';

const express = require('express');
const { Op } = require('sequelize');
const {
  models: { User, Expense, Category },
} = require('./models/models');

function createServer() {
  const app = express();

  app.use(express.json());

  // --- USERS ---
  app.get('/users', async (req, res) => {
    res.json(await User.findAll());
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const newUser = await User.create({ name });

    res.status(201).json(newUser.get({ plain: true }));
  });

  app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }
    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    await user.update({ name });
    res.json(user.get({ plain: true }));
  });

  app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }
    await user.destroy();
    res.sendStatus(204);
  });

  // --- CATEGORIES ---
  app.get('/categories', async (req, res) => {
    res.json(await Category.findAll());
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const newCategory = await Category.create({ name });

    res.status(201).json(newCategory.get({ plain: true }));
  });

  app.get('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.sendStatus(404);
    }
    res.json(category);
  });

  app.patch('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.sendStatus(404);
    }

    if (!req.body.name) {
      return res.sendStatus(400);
    }
    await category.update({ name: req.body.name });
    res.json(category.get({ plain: true }));
  });

  app.delete('/categories/:id', async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.sendStatus(404);
    }
    await category.destroy();
    res.sendStatus(204);
  });

  // --- EXPENSES ---
  app.get('/expenses', async (req, res) => {
    const { userId, categories, category, from, to } = req.query;
    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    const rawCategories = categories || category;

    if (rawCategories) {
      const names = rawCategories.split(',').map((c) => c.trim());
      const foundCategories = await Category.findAll({
        where: { name: { [Op.in]: names } },
      });

      where.categoryId = { [Op.in]: foundCategories.map((c) => c.id) };
    }

    if (from || to) {
      where.spentAt = {};

      if (from) {
        where.spentAt[Op.gte] = from;
      }

      if (to) {
        where.spentAt[Op.lte] = to;
      }
    }

    const expenses = await Expense.findAll({
      where,
      include: [{ model: Category, attributes: ['name'] }],
    });

    const result = expenses.map((e) => {
      const { categoryId, category: catObj, ...rest } = e.get({ plain: true });

      return { ...rest, category: catObj.name };
    });

    res.json(result);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['name'] }],
    });

    if (!expense) {
      return res.sendStatus(404);
    }

    const {
      categoryId,
      category: catObj,
      ...rest
    } = expense.get({ plain: true });

    res.json({ ...rest, category: catObj.name });
  });

  app.post('/expenses', async (req, res) => {
    const { userId, amount, category, categoryId, title, spentAt, note } =
      req.body;

    if (userId === undefined || amount === undefined || !title || !spentAt) {
      return res.sendStatus(400);
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    let finalCategoryId = categoryId;
    let categoryName = category || 'Other';

    if (finalCategoryId) {
      const cat = await Category.findByPk(finalCategoryId);

      if (!cat) {
        return res.sendStatus(400);
      }
      categoryName = cat.name;
    } else {
      const [catInstance] = await Category.findOrCreate({
        where: { name: categoryName },
      });

      finalCategoryId = catInstance.id;
      categoryName = catInstance.name;
    }

    const newExpense = await Expense.create({
      userId: Number(userId),
      amount: Number(amount),
      categoryId: finalCategoryId,
      title,
      spentAt,
      note: note || null,
    });

    const { categoryId: _, ...rest } = newExpense.get({ plain: true });

    res.status(201).json({
      ...rest,
      category: categoryName,
    });
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    if (req.body.userId !== undefined) {
      const user = await User.findByPk(req.body.userId);

      if (!user) {
        return res.sendStatus(400);
      }
    }

    await expense.update(req.body);

    const updated = await Expense.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['name'] }],
    });

    const {
      categoryId,
      category: catObj,
      ...rest
    } = updated.get({ plain: true });

    res.json({ ...rest, category: catObj.name });
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }
    await expense.destroy();
    res.sendStatus(204);
  });

  return app;
}

module.exports = { createServer };
