'use strict';

const express = require('express');
const { models } = require('./models/models');
const { Op } = require('sequelize');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/users', async (req, res) => {
    const users = await models.User.findAll();

    res.status(200).json(users);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (name == null) {
      res.status(400).json({ error: 'One or more fields are missing' });

      return;
    }

    const createdUser = await models.User.create({ name });

    res.status(201).json(createdUser);
  });

  app.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });
    }

    const user = await models.User.findOne({ where: { id: id } });

    if (user == null) {
      res.status(404).json({ error: 'User not found' });

      return;
    }
    res.status(200).json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const user = await models.User.findByPk(id);

    if (user == null) {
      res.status(404).json({ error: 'User not found' });

      return;
    }
    await models.User.destroy({ where: { id: id } });
    res.status(204).end();
  });

  app.patch('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (name == null) {
      res.status(400).json({ error: 'One or more fields are missing' });

      return;
    }

    const [affectedRowsCount, updatedRows] = await models.User.update(
      { name: name },
      { where: { id: id }, returning: true },
    );

    if (affectedRowsCount === 0) {
      res.status(404).json({ error: 'User not found' });

      return;
    }

    res.status(200).json(updatedRows.at(0));
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const filters = {};

    if (userId) {
      filters.userId = parseInt(userId);
    }

    if (categories) {
      if (Array.isArray(categories)) {
        filters.category = { [Op.in]: categories };
      } else {
        filters.category = categories;
      }
    }

    // Filter by date range
    if (from || to) {
      filters.spentAt = {};

      if (from) {
        filters.spentAt[Op.gte] = new Date(from);
      }

      if (to) {
        filters.spentAt[Op.lte] = new Date(to);
      }
    }

    const expenses = await models.Expense.findAll({
      where: filters,
    });

    res.status(200).json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId == null ||
      spentAt == null ||
      title == null ||
      amount == null /* ||
      category == null */
    ) {
      res
        .status(400)
        .json({ error: 'One or more required fields are missing' });

      return;
    }

    const user = await models.User.findByPk(userId);

    if (!user) {
      res.status(400).json({ error: 'Invalid user ID' });

      return;
    }

    const newExpense = await models.Expense.create({
      userId: userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note ?? null,
    });

    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID' });

      return;
    }

    const expense = await models.Expense.findByPk(id);

    if (expense == null) {
      res.status(404).json({ error: 'User not found' });

      return;
    }
    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const expense = await models.Expense.findByPk(id);

    if (expense == null) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }
    await models.Expense.destroy({ where: { id: id } });
    res.status(204).end();
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;

    const expense = await models.Expense.findByPk(id);

    if (expense == null) {
      res.status(404).json({ error: 'Expense not found' });

      return;
    }

    const changedFields = {};

    if (spentAt != null) {
      changedFields.spentAt = spentAt;
    }

    if (title != null) {
      changedFields.title = title;
    }

    if (amount != null) {
      changedFields.amount = amount;
    }

    if (category != null) {
      changedFields.category = category;
    }

    if (note != null) {
      changedFields.note = note;
    }

    if (changedFields.length === 0) {
      res.status(400).json({ error: 'At least one field is required' });

      return;
    }

    // eslint-disable-next-line no-unused-vars
    const [affectedRowsCount, updatedRows] = await models.Expense.update(
      changedFields,
      {
        where: { id: id },
        returning: true,
      },
    );

    res.status(200).json(updatedRows.at(0));
  });

  return app;
}

module.exports = {
  createServer,
};
