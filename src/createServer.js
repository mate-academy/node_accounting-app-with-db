'use strict';

const { models } = require('../src/models/models');
const express = require('express');

function createServer() {
  const app = express();

  app.get('/users', async (req, res) => {
    try {
      const users = await models.User.findAll();

      if (users.length === 0) {
        res.statusCode = 200;
        res.json([]);

        return;
      }

      const plainUsers = users.map((u) => u.toJSON());

      res.json(plainUsers);
    } catch (error) {
      res.sendStatus(500);
    }
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const user = await models.User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.json(user.toJSON());
  });

  app.post('/users', express.json(), async (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    try {
      const newUser = await models.User.create({
        name,
      });

      res.status(201).json(newUser.toJSON());
    } catch {
      res.sendStatus(500);
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const deleteCount = await models.User.destroy({ where: { id } });

    if (deleteCount === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (
      !Number.isFinite(Number(id)) ||
      typeof name !== 'string' ||
      name === undefined
    ) {
      res.sendStatus(400);

      return;
    }

    const [updateCount] = await models.User.update({ name }, { where: { id } });

    if (updateCount === 0) {
      res.sendStatus(404);

      return;
    }

    const updateUser = await models.User.findByPk(id);

    res.statusCode = 200;
    res.json(updateUser.toJSON());
  });

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  // --- GET /expenses ---
  // --- GET /expenses ---
  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to, amount } = req.query;

    try {
      const [expenses, allCategories] = await Promise.all([
        models.Expense.findAll(),
        models.Category.findAll(),
      ]);

      const categoryById = Object.fromEntries(
        allCategories.map((c) => [c.id, c.name]),
      );

      let filtered = expenses;

      if (userId !== undefined) {
        filtered = filtered.filter((e) => e.userId === Number(userId));
      }

      if (categories !== undefined) {
        const categoryList = Array.isArray(categories)
          ? categories
          : categories.split(',');

        const validCategoryNames = allCategories.map((c) => c.name);
        const invalid = categoryList.filter(
          (name) => !validCategoryNames.includes(name),
        );

        if (invalid.length > 0) {
          return res.status(400).send({
            message: `Invalid categories: ${invalid.join(', ')}`,
          });
        }

        filtered = filtered.filter((e) =>
          // eslint-disable-next-line prettier/prettier
          categoryList.includes(categoryById[e.categoryId]));
      }

      let fromTime, toTime;

      if (from !== undefined) {
        fromTime = new Date(from).getTime();
      }

      if (to !== undefined) {
        toTime = new Date(to).getTime();
      }

      if (fromTime !== undefined) {
        filtered = filtered.filter(
          (e) => new Date(e.spentAt).getTime() >= fromTime,
        );
      }

      if (toTime !== undefined) {
        filtered = filtered.filter(
          (e) => new Date(e.spentAt).getTime() <= toTime,
        );
      }

      if (amount !== undefined) {
        filtered = filtered.filter((e) => e.amount === Number(amount));
      }

      const result = filtered.map((e) => ({
        id: e.id,
        userId: e.userId,
        spentAt: e.spentAt,
        title: e.title,
        amount: e.amount,
        note: e.note ?? undefined,
        category: categoryById[e.categoryId] ?? undefined,
      }));

      res.status(200).send(result);
    } catch {
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/expenses', express.json(), async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      return res.sendStatus(400);
    }

    const user = await models.User.findByPk(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    try {
      let categoryId = null;
      let categoryName;

      if (category) {
        const [categoryObj] = await models.Category.findOrCreate({
          where: { name: category },
        });

        categoryId = categoryObj.id;
        categoryName = categoryObj.name;
      }

      const expense = await models.Expense.create({
        userId,
        spentAt,
        title,
        amount,
        categoryId,
        note: note || null,
      });

      res.status(201).json({
        id: expense.id,
        userId: expense.userId,
        spentAt: expense.spentAt,
        title: expense.title,
        amount: expense.amount,
        note: expense.note ?? undefined,
        category: categoryName,
      });
    } catch {
      res.sendStatus(500);
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(Number(id))) {
      return res.sendStatus(400);
    }

    try {
      const expense = await models.Expense.findByPk(id);

      if (!expense) {
        return res.sendStatus(404);
      }

      const allCategories = await models.Category.findAll();
      const categoryById = Object.fromEntries(
        allCategories.map((c) => [c.id, c.name]),
      );

      const result = {
        id: expense.id,
        userId: expense.userId,
        spentAt: expense.spentAt,
        title: expense.title,
        amount: expense.amount,
        note: expense.note ?? undefined,
        category: categoryById[expense.categoryId] ?? undefined,
      };

      res.status(200).json(result);
    } catch {
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const newExpenses = await models.Expense.destroy({ where: { id } });

    if (newExpenses === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    if (!Number.isFinite(Number(id))) {
      return res.sendStatus(400);
    }

    try {
      let categoryId;
      let categoryName;

      if (category) {
        const [categoryObj] = await models.Category.findOrCreate({
          where: { name: category },
        });

        categoryId = categoryObj.id;
        categoryName = categoryObj.name;
      }

      const [updatedCount] = await models.Expense.update(
        {
          spentAt,
          title,
          amount,
          note,
          ...(category ? { categoryId } : {}),
        },
        { where: { id } },
      );

      if (updatedCount === 0) {
        return res.sendStatus(404);
      }

      const expense = await models.Expense.findByPk(id);

      if (!categoryName && expense.categoryId) {
        const cat = await models.Category.findByPk(expense.categoryId);

        categoryName = cat?.name;
      }

      res.status(200).json({
        id: expense.id,
        userId: expense.userId,
        spentAt: expense.spentAt,
        title: expense.title,
        amount: expense.amount,
        note: expense.note ?? undefined,
        category: categoryName,
      });
    } catch {
      res.sendStatus(500);
    }
  });

  app.get('/category', async (req, res) => {
    try {
      const categories = await models.Category.findAll();

      res.status(200).json(categories.map((c) => c.toJSON()));
    } catch {
      res.sendStatus(500);
    }
  });

  app.get('/category/:id', async (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(+id)) {
      return res.sendStatus(400);
    }

    const category = await models.Category.findByPk(id);

    if (!category) {
      return res.sendStatus(404);
    }

    res.status(200).json(category.toJSON());
  });

  app.post('/category', express.json(), async (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.sendStatus(400);
    }

    const newCategory = await models.Category.create({ name });

    res.status(201).json(newCategory);
  });

  app.patch('/category/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!Number.isFinite(+id) || !name || typeof name !== 'string') {
      return res.sendStatus(400);
    }

    const [updated] = await models.Category.update({ name }, { where: { id } });

    if (!updated) {
      return res.sendStatus(404);
    }

    const category = await models.Category.findByPk(id);

    res.status(200).json(category);
  });

  app.delete('/category/:id', async (req, res) => {
    const { id } = req.params;

    if (!Number.isFinite(+id)) {
      return res.sendStatus(400);
    }

    const deleted = await models.Category.destroy({ where: { id } });

    if (!deleted) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
