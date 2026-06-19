'use strict';

const express = require('express');
const { Op } = require('sequelize');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Category } = require('./models/Category.model');

const prepareExpense = (expense) => {
  const { createdAt, updatedAt, ...preparedExpense } = expense.toJSON();

  return preparedExpense;
};

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const result = await User.findAll();

    res.send(result);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.get('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.json(user);
  });

  app.patch('/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await user.update({ name }, { silent: true });

    res.json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const deletedCount = await User.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const where = {};

    if (userId !== undefined) {
      const parsedUserId = Number(userId);

      if (Number.isNaN(parsedUserId)) {
        res.sendStatus(400);

        return;
      }

      where.userId = parsedUserId;
    }

    if (categories !== undefined) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      where.category = {
        [Op.in]: categoriesArray,
      };
    }

    if (from !== undefined || to !== undefined) {
      where.spentAt = {};

      if (from !== undefined) {
        const fromDate = new Date(from);

        if (isNaN(fromDate.getTime())) {
          res.sendStatus(400);

          return;
        }

        where.spentAt[Op.gte] = fromDate;
      }

      if (to !== undefined) {
        const toDate = new Date(to);

        if (isNaN(toDate.getTime())) {
          res.sendStatus(400);

          return;
        }

        where.spentAt[Op.lte] = toDate;
      }
    }

    const expenses = await Expense.findAll({ where });

    res.json(expenses.map(prepareExpense));
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      typeof userId !== 'number' ||
      typeof spentAt !== 'string' ||
      typeof title !== 'string' ||
      typeof amount !== 'number'
    ) {
      res.sendStatus(400);

      return;
    }

    if (category !== undefined && typeof category !== 'string') {
      res.sendStatus(400);

      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      ...(category !== undefined ? { category } : {}),
      ...(note !== undefined ? { note } : {}),
    });

    return res.status(201).json(prepareExpense(expense));
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.json(prepareExpense(expense));
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const hasNoFields =
      spentAt === undefined &&
      title === undefined &&
      amount === undefined &&
      category === undefined &&
      note === undefined;

    if (hasNoFields) {
      res.sendStatus(400);

      return;
    }

    if (spentAt !== undefined) {
      if (typeof spentAt !== 'string') {
        res.sendStatus(400);

        return;
      }

      const spentAtDate = new Date(spentAt);

      if (Number.isNaN(spentAtDate.getTime())) {
        res.sendStatus(400);

        return;
      }
    }

    if (title !== undefined && typeof title !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (amount !== undefined && typeof amount !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (category !== undefined && typeof category !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (note !== undefined && note !== null && typeof note !== 'string') {
      res.sendStatus(400);

      return;
    }

    const updatedFields = {};

    if (spentAt !== undefined) {
      updatedFields.spentAt = spentAt;
    }

    if (title !== undefined) {
      updatedFields.title = title;
    }

    if (amount !== undefined) {
      updatedFields.amount = amount;
    }

    if (category !== undefined) {
      updatedFields.category = category;
    }

    if (note !== undefined) {
      updatedFields.note = note;
    }

    await expense.update(updatedFields);

    res.json(prepareExpense(expense));
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const deletedCount = await Expense.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  });

  app.get('/categories', async (req, res) => {
    const categories = await Category.findAll();

    res.json(categories);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string' || !name.trim()) {
      res.sendStatus(400);

      return;
    }

    const existingCategory = await Category.findOne({
      where: { name: name.trim() },
    });

    if (existingCategory) {
      res.sendStatus(400);

      return;
    }

    const category = await Category.create({
      name: name.trim(),
    });

    res.status(201).json(category);
  });

  app.get('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const category = await Category.findByPk(id);

    if (!category) {
      res.sendStatus(404);

      return;
    }

    res.json(category);
  });

  app.patch('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    if (typeof name !== 'string' || !name.trim()) {
      res.sendStatus(400);

      return;
    }

    const category = await Category.findByPk(id);

    if (!category) {
      res.sendStatus(404);

      return;
    }

    const existingCategory = await Category.findOne({
      where: { name: name.trim() },
    });

    if (existingCategory && existingCategory.id !== id) {
      res.sendStatus(400);

      return;
    }

    await category.update({
      name: name.trim(),
    });

    res.json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.sendStatus(400);

      return;
    }

    const deletedCount = await Category.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  });

  return app;
};

module.exports = {
  createServer,
};
