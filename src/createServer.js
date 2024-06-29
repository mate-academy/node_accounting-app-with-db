'use strict';

const express = require('express');
const { Client } = require('pg');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Op } = require('sequelize');

const createServer = () => {
  const app = express();
  const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'postgres',
  });

  client.connect();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello');
  });

  app.get('/users', async (req, res) => {
    try {
      const result = await User.findAll();

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required' });
    }

    try {
      const result = await User.create({ name });

      res.status(201).send(result);
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  app.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
      const result = await User.findByPk(id);

      if (!result) {
        return res.status(404).send({ error: 'User not found' });
      }

      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      await User.destroy({ where: { id } });

      res.sendStatus(204);
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  app.patch('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required' });
    }

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      await User.update({ name }, { where: { id } });

      const updatedUser = await User.findByPk(id);

      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const where = {};

    if (userId) {
      where.userId = parseInt(userId, 10);
    }

    if (from) {
      where.spentAt = { [Op.gte]: new Date(from) };
    }

    if (to) {
      if (!where.spentAt) {
        where.spentAt = {};
      }
      where.spentAt[Op.lte] = new Date(to);
    }

    if (categories) {
      const categoriesArray = categories.split(',');

      where.category = { [Op.in]: categoriesArray };
    }

    try {
      const result = await Expense.findAll({
        where,
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const expenseData = {
        spentAt,
        title,
        amount,
        category,
        userId,
      };

      if (note) {
        expenseData.note = note;
      }

      const expense = await Expense.create(expenseData);

      res.status(201).json(expense);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
      const expense = await Expense.findByPk(id);

      if (!expense) {
        return res.status(404).send({ error: 'User not found' });
      }

      res.status(200).send(expense);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, amount, category, note } = req.body;

    const fieldsToUpdate = {};

    if (title) {
      fieldsToUpdate.title = title;
    }

    if (amount) {
      fieldsToUpdate.amount = amount;
    }

    if (category) {
      fieldsToUpdate.category = category;
    }

    if (note) {
      fieldsToUpdate.note = note;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({ error: 'No fields to update' });
    }

    try {
      const [updatedRowsCount, updatedRows] = await Expense.update(
        fieldsToUpdate,
        {
          where: { id },
          returning: true,
        },
      );

      if (updatedRowsCount === 0) {
        return res.status(404).send({ error: 'Expense not found' });
      }

      res.status(200).json(updatedRows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
      const result = await Expense.destroy({ where: { id } });

      if (result[0] === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return app;
};

module.exports = {
  createServer,
};
