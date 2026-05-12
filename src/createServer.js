'use strict';

const {
  models: { User, Expense },
} = require('./models/models.js');
const { Op } = require('sequelize');
const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.status(200).send(users);
  });

  app.get('/expenses', async (req, res) => {
    const whereClause = {};

    if (req.query.userId) {
      whereClause.userId = +req.query.userId;
    }

    if (req.query.from) {
      whereClause.spentAt = {
        ...whereClause.spentAt,
        [Op.gte]: new Date(req.query.from),
      };
    }

    if (req.query.to) {
      whereClause.spentAt = {
        ...whereClause.spentAt,
        [Op.lte]: new Date(req.query.to),
      };
    }

    if (req.query.categories) {
      const categoriesArray = [].concat(req.query.categories);

      whereClause.category = { [Op.in]: categoriesArray };
    }

    const expenses = await Expense.findAll({
      where: whereClause,
    });

    res.status(200).send(expenses);
  });

  app.get('/users/:id', async (req, res) => {
    const id = +req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).send('Not found');

      return;
    }

    res.status(200).send(user);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = +req.params.id;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).send('Not found');

      return;
    }

    res.status(200).send(expense);
  });

  app.post('/users', async (req, res) => {
    const userName = req.body.name;

    if (!userName) {
      res.status(400).send('Required parameter is not passed');

      return;
    }

    const newUser = await User.create({ name: userName });

    res.status(201).send(newUser);
  });

  app.post('/expenses', async (req, res) => {
    if (
      !req.body.userId ||
      !req.body.title ||
      !req.body.amount ||
      !req.body.spentAt
    ) {
      res.status(400).send('Required parameter is not passed');

      return;
    }

    const userId = +req.body.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(400).send('User not found');

      return;
    }

    const newExpense = await Expense.create({
      userId: +req.body.userId,
      spentAt: req.body.spentAt,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      note: req.body.note,
    });

    res.status(201).send(newExpense);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = +req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    await user.destroy();

    res.status(204).send();
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = +req.params.id;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    await expense.destroy();

    res.status(204).send();
  });

  app.patch('/users/:id', async (req, res) => {
    const id = +req.params.id;
    const newUserName = req.body.name;

    if (!newUserName) {
      res.status(400).send('No data received');

      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    user.name = newUserName;

    await user.save();

    res.status(200).send(user);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = +req.params.id;
    const expenseKeys = Object.keys(req.body);
    const allowedUpdates = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    if (expenseKeys.length === 0) {
      res.status(400).send('No data received');

      return;
    }

    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) {
        expense[key] = req.body[key];
      }
    });

    await expense.save();

    res.status(200).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
