'use strict';

const express = require('express');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Op } = require('sequelize');

function validateId(req, res, next) {
  const userId = Number(req.params.id);

  if (userId < 0 || Number.isNaN(userId)) {
    return res.status(400).send('Bad request');
  }

  req.id = userId;

  next();
}

function createServer() {
  const app = express();

  app.use(express.json());

  app.set('json spaces', 2);

  // users
  app.get('/users', async (req, res) => {
    const data = await User.findAll();

    res.json(data);
  });

  app.post('/users', async (req, res) => {
    const name = req.body?.name?.trim();

    if (!name) {
      res.status(400).send('Bad request');

      return;
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  app.get('/users/:id', validateId, async (req, res) => {
    const user = await User.findByPk(req.id);

    if (!user) {
      res.status(404).send('Not found');

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', validateId, async (req, res) => {
    const deletedCount = await User.destroy({ where: { id: req.id } });

    if (deletedCount === 0) {
      res.status(404).send('Not found');

      return;
    }

    res.status(204).end();
  });

  app.patch('/users/:id', validateId, async (req, res) => {
    const user = await User.findByPk(req.id);
    const name = req.body?.name?.trim();

    if (!user) {
      res.status(404).send('Not found');

      return;
    }

    if (!name) {
      res.status(400).send('Bad request');

      return;
    }

    user.name = name;

    await user.save();

    res.json(user);
  });

  // expenses
  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      where.category = { [Op.in]: categoryList };
    }

    if (from) {
      where.spentAt = { [Op.gte]: from };
    }

    if (to) {
      where.spentAt = { [Op.lte]: to };
    }

    const result = await Expense.findAll({ where });

    res.json(result);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = await User.findByPk(userId);

    const invalidUserId = !Number.isInteger(userId) || userId < 0;
    const invalidSpentAt = !spentAt || Number.isNaN(Date.parse(spentAt));
    const invalidTitle = typeof title !== 'string' || !title.trim();
    const invalidAmount = !Number.isInteger(amount) || amount < 0;
    const invalidCategory =
      category !== undefined &&
      (typeof category !== 'string' || !category.trim());
    const invalidNote = note !== undefined && typeof note !== 'string';

    if (
      invalidUserId ||
      !user ||
      invalidSpentAt ||
      invalidTitle ||
      invalidAmount ||
      invalidCategory ||
      invalidNote
    ) {
      return res.status(400).send('Bad request');
    }

    const expense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    const exp = await Expense.create(expense);

    res.status(201).json(exp);
  });

  app.get('/expenses/:id', validateId, async (req, res) => {
    const exp = await Expense.findByPk(req.id);

    if (!exp) {
      res.status(404).send('Not found');

      return;
    }

    res.send(exp);
  });

  app.delete('/expenses/:id', validateId, async (req, res) => {
    const deletedCount = await Expense.destroy({ where: { id: req.id } });

    if (deletedCount === 0) {
      res.status(404).send('Not found');

      return;
    }

    res.status(204).end();
  });

  app.patch('/expenses/:id', validateId, async (req, res) => {
    const exp = await Expense.findByPk(req.id);

    if (!exp) {
      return res.status(404).send('Not found');
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt !== undefined && Number.isNaN(Date.parse(spentAt))) {
      return res.status(400).send('Bad request');
    }

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).send('Bad request');
    }

    if (amount !== undefined && (!Number.isInteger(amount) || amount < 0)) {
      return res.status(400).send('Bad request');
    }

    if (
      category !== undefined &&
      (typeof category !== 'string' || !category.trim())
    ) {
      return res.status(400).send('Bad request');
    }

    if (note !== undefined && typeof note !== 'string') {
      return res.status(400).send('Bad request');
    }

    const updates = {};

    if (spentAt !== undefined) {
      updates.spentAt = spentAt;
    }

    if (title !== undefined) {
      updates.title = title.trim();
    }

    if (amount !== undefined) {
      updates.amount = amount;
    }

    if (category !== undefined) {
      updates.category = category.trim();
    }

    if (note !== undefined) {
      updates.note = note;
    }

    await exp.update(updates);

    res.json(exp);
  });

  return app;
}

module.exports = {
  createServer,
};
