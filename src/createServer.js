'use strict';

const express = require('express');
const cors = require('cors');
const { User } = require('../src/models/User.model');
const { Expense } = require('../src/models//Expense.model');
const { Op } = require('sequelize');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/users', async (req, res) => {
    const user = await User.findAll();

    res.send(user);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (user) {
      return res.status(200).send(user);
    } else {
      return res.sendStatus(404);
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await User.create({ id: '5', name }, { fields: ['name'] });

    res.status(201).send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const deleteUser = await User.destroy({
      where: {
        id,
      },
    });

    if (!deleteUser) {
      return res.sendStatus(404);
    }

    const getUsers = await User.findAll();

    return res.status(204).send(getUsers);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const userUpdate = await User.update({ name }, { where: { id } });

    if (!userUpdate[0]) {
      return res.sendStatus(404);
    }

    const user = await User.findByPk(id);

    res.status(200).send(user);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;

    if (categories && userId) {
      const expense = await Expense.findAll({
        where: {
          userId,
          category: categories,
        },
      });

      return res.status(200).send(expense);
    }

    if (userId && !categories) {
      const expense = await Expense.findAll({
        where: {
          userId,
        },
      });

      return res.status(200).send(expense);
    }

    if (from && to) {
      const expense = await Expense.findAll({
        where: {
          spentAt: {
            [Op.between]: [from, to],
          },
        },
      });

      return res.status(200).send(expense);
    }

    return res.status(200).send(await Expense.findAll());
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    // eslint-disable-next-line no-console
    console.log('expense', expense);

    if (expense) {
      return res.status(200).send(expense);
    } else {
      return res.sendStatus(404);
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const getUser = await User.findByPk(userId);

    if (!getUser) {
      return res.sendStatus(400);
    }

    const expense = await Expense.create(
      {
        id: 8,
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      },
      { fields: ['userId', 'spentAt', 'title', 'amount', 'category', 'note'] },
    );

    await res.status(201).send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const deleteExpense = await Expense.destroy({
      where: {
        id,
      },
    });

    if (!deleteExpense) {
      return res.sendStatus(404);
    }

    return res.status(204).send(await User.findAll());
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const updateExpense = await Expense.update({ title }, { where: { id } });

    if (!updateExpense[0]) {
      return res.sendStatus(404);
    }

    const expense = await Expense.findByPk(id);

    res.status(200).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
