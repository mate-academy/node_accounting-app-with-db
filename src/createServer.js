/* eslint-disable no-undef */
'use strict';

const express = require('express');
const { models } = require('./models/models.js');
const { Op } = require('sequelize');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();
  const { User, Expense, Category } = models;

  app.use(express.json());
  // #region helpers and validate

  function parseId(value) {
    const id = Number(value);

    if (!Number.isInteger(id) || id <= 0) {
      return null;
    }

    return id;
  }

  function isValidDateTime(value) {
    if (typeof value !== 'string') {
      return false;
    }

    const time = Date.parse(value);

    return Number.isFinite(time);
  }

  function sendBadRequest(res, message) {
    res.status(400).json({ message });
  }

  function sendNotFound(res, message) {
    res.status(404).json({ message });
  }

  async function findUserById(id) {
    // eslint-disable-next-line no-return-await
    return await User.findByPk(id);
  }

  async function findExpenseById(id) {
    // eslint-disable-next-line no-return-await
    return await Expense.findByPk(id);
  }

  async function findCategoryById(id) {
    // eslint-disable-next-line no-return-await
    return await Category.findByPk(id);
  }
  // #endregion

  // #region users
  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    const { name } = body;

    if (typeof name !== 'string' || name.trim() === '') {
      return sendBadRequest(res, 'Field "name" is required');
    }

    try {
      const newUser = await User.create({
        name: name.trim(),
      });

      res.status(201).json(newUser);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });

  app.get('/users/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const user = await findUserById(id);

    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const user = await findUserById(id);

    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    if (typeof body.name !== 'string' || body.name.trim() === '') {
      return sendBadRequest(res, 'Field "name" is required');
    }

    user.name = body.name.trim();

    await user.save();

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const user = await findUserById(id);

    if (!user) {
      return sendNotFound(res, 'User not found');
    }

    await user.destroy();

    res.status(204).send();
  });
  // #endregion

  // #region expenses
  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const where = {};

    if (userId !== undefined) {
      const parseUserId = parseId(userId);

      if (parseUserId === null) {
        return sendBadRequest(res, 'Invalid userId');
      }

      where.userId = parseUserId;
    }

    if (categories !== undefined) {
      let categoriesList = categories;

      if (typeof categoriesList === 'string') {
        /* eslint-disable prettier/prettier */
        categoriesList = categoriesList.includes(',')
          ? categoriesList
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
          : [categoriesList.trim()].filter(Boolean);
        /* eslint-disable prettier/prettier */
      }

      const found = await Category.findAll({
        where: { name: { [Op.in]: categoriesList } },
      });

      where.categoryId = { [Op.in]: found.map((c) => c.id) };
    }

    if (from !== undefined) {
      if (!isValidDateTime(from)) {
        return sendBadRequest(res, 'Invalid "from" date-time');
      }

      where.spentAt = {
        ...(where.spentAt || {}),
        [Op.gte]: new Date(from),
      };
    }

    if (to !== undefined) {
      if (!isValidDateTime(to)) {
        return sendBadRequest(res, 'Invalid "to" date-time');
      }

      where.spentAt = {
        ...(where.spentAt || {}),
        [Op.lte]: new Date(to),
      };
    }

    const expenses = await Expense.findAll({
      where,
      include: [{ model: Category }],
    });

    res.json(
      expenses.map((e) => ({
        id: e.id,
        userId: e.userId,
        spentAt: e.spentAt,
        title: e.title,
        amount: e.amount,
        category: e.Category?.name ?? null,
        note: e.note,
      })),
    );
  });

  app.post('/expenses', async (req, res) => {
    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    const { userId, spentAt, title, amount, category, note } = body;

    const parsedUserId = parseId(userId);

    if (parsedUserId === null) {
      return sendBadRequest(
        res,
        'Field "userId" is required and must be integer',
      );
    }

    const user = await findUserById(parsedUserId);

    if (!user) {
      return sendBadRequest(res, 'User not found');
    }

    if (typeof title !== 'string' || title.trim() === '') {
      return sendBadRequest(res, 'Field "title" is required');
    }

    const parsedAmount = Number(amount);

    if (!Number.isInteger(parsedAmount)) {
      return sendBadRequest(res, 'Field "amount" must be integer');
    }

    const DEFAULT_CATEGORY = 'Other';

    let categoryValue = DEFAULT_CATEGORY;

    if (category !== undefined && category !== null) {
      if (typeof category !== 'string' || category.trim() === '') {
        return sendBadRequest(res, 'Field "category" must be non-empty string');
      }

      categoryValue = category.trim();
    }

    const [cat] = await Category.findOrCreate({
      where: { name: categoryValue },
      defaults: { name: categoryValue },
    });

    if (note !== undefined && note !== null && typeof note !== 'string') {
      return sendBadRequest(res, 'Field "note" must be string');
    }

    let spentAtValue;

    if (spentAt === undefined || spentAt === null) {
      // Use current date if not provided
      spentAtValue = new Date();
    } else if (typeof spentAt === 'string') {
      if (!isValidDateTime(spentAt)) {
        return sendBadRequest(
          res,
          'Field "spentAt" must be a valid date-time string',
        );
      }
      spentAtValue = new Date(spentAt);
    } else if (spentAt instanceof Date) {
      if (!Number.isFinite(spentAt.getTime())) {
        return sendBadRequest(
          res,
          'Field "spentAt" must be a valid date-time string',
        );
      }
      spentAtValue = spentAt;
    } else {
      return sendBadRequest(
        res,
        'Field "spentAt" must be a valid date-time string',
      );
    }

    const newExpense = await Expense.create({
      userId: parsedUserId,
      spentAt: spentAtValue,
      title: title.trim(),
      amount: parsedAmount,
      categoryId: cat.id,
      note: note !== undefined && note !== null ? note : null,
    });

    res.status(201).json({
      id: newExpense.id,
      userId: newExpense.userId,
      spentAt: newExpense.spentAt,
      title: newExpense.title,
      amount: newExpense.amount,
      category: categoryValue,
      note: newExpense.note,
    });
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const expense = await Expense.findByPk(id, {
      include: [{ model: Category }],
    });

    if (!expense) {
      return sendNotFound(res, 'Expense not found');
    }

    res.json({
      id: expense.id,
      userId: expense.userId,
      spentAt: expense.spentAt,
      title: expense.title,
      amount: expense.amount,
      category: expense.Category?.name ?? null,
      note: expense.note,
    });
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const expense = await findExpenseById(id);

    if (!expense) {
      return sendNotFound(res, 'Expense not found');
    }

    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    if (Object.prototype.hasOwnProperty.call(body, 'spentAt')) {
      if (!isValidDateTime(body.spentAt)) {
        return sendBadRequest(res, 'Field "spentAt" must be valid date-time');
      }

      expense.spentAt = body.spentAt;
    }

    if (Object.prototype.hasOwnProperty.call(body, 'title')) {
      if (typeof body.title !== 'string' || body.title.trim() === '') {
        return sendBadRequest(res, 'Field "title" must be non-empty string');
      }

      expense.title = body.title.trim();
    }

    if (Object.prototype.hasOwnProperty.call(body, 'amount')) {
      const parsedAmount = Number(body.amount);

      if (!Number.isInteger(parsedAmount)) {
        return sendBadRequest(res, 'Field "amount" must be integer');
      }

      expense.amount = parsedAmount;
    }

    if (Object.prototype.hasOwnProperty.call(body, 'category')) {
      if (typeof body.category !== 'string' || body.category.trim() === '') {
        return sendBadRequest(res, 'Field "category" must be non-empty string');
      }

      const categoryName = body.category.trim();

      const [cat] = await Category.findOrCreate({
        where: { name: categoryName },
        defaults: { name: categoryName },
      });

      expense.categoryId = cat.id;
    }

    if (Object.prototype.hasOwnProperty.call(body, 'note')) {
      if (body.note === null) {
        expense.note = null;
      } else if (typeof body.note !== 'string') {
        return sendBadRequest(res, 'Field "note" must be string or null');
      } else {
        expense.note = body.note;
      }
    }

    await expense.save();

    const updated = await Expense.findByPk(expense.id, {
      include: [{ model: Category }],
    });

    res.json({
      id: updated.id,
      userId: updated.userId,
      spentAt: updated.spentAt,
      title: updated.title,
      amount: updated.amount,
      category: updated.Category?.name ?? null,
      note: updated.note,
    });
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const expense = await findExpenseById(id);

    if (!expense) {
      return sendNotFound(res, 'Expense not found');
    }

    await expense.destroy();

    res.status(204).send();
  });
  // #endregion

  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.json(categories);
  });

  app.post('/categories', async (req, res) => {
    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    const { name } = body;

    if (typeof name !== 'string' || name.trim() === '') {
      return sendBadRequest(res, 'Field "name" is required');
    }

    try {
      const category = await Category.create({ name: name.trim() });

      res.status(201).json(category);
    } catch (e) {
      return sendBadRequest(res, 'Category already exists');
    }
  });

  app.patch('/categories/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const category = await findCategoryById(id);

    if (!category) {
      return sendNotFound(res, 'Category not found');
    }

    const body = req.body;

    if (!body || typeof body !== 'object') {
      return sendBadRequest(res, 'Request body is required');
    }

    if (typeof body.name !== 'string' || body.name.trim() === '') {
      return sendBadRequest(res, 'Field "name" is required');
    }

    category.name = body.name.trim();
    await category.save();

    res.json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const id = parseId(req.params.id);

    if (id === null) {
      return sendBadRequest(res, 'Invalid id');
    }

    const category = await findCategoryById(id);

    if (!category) {
      return sendNotFound(res, 'Category not found');
    }

    await category.destroy();
    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
