'use strict';

const express = require('express');
const User = require('./models/users.js');
const Expense = require('./models/expense.js');
const { Op } = require('sequelize');
const sequelize = require('./utils/db.js');

const app = express();

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  User.sync({ force: true });
  Expense.sync({ force: true });

  app.get('/users', async(req, res) => {
    const usersAll = await User.findAll();

    res.send(usersAll);
  });

  app.post('/users', express.json(), async(req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await User.create({ name });

    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', async(req, res) => {
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  });

  app.delete('/users/:id', async(req, res) => {
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const result = await User.destroy({
      where: {
        id,
      },
    });

    if (result !== 1) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), async(req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const result = await User.update(
      { name },
      {
        where: { id },
        returning: true,
      });

    if (result[0] === 0) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 200;
    res.send(result[1]);
  });

  app.get('/expenses', async(req, res) => {
    const searchParams = new URLSearchParams(req.url
      .substring('/expenses'.length));
    const userId = searchParams.get('userId');
    const categories = searchParams.getAll('categories');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const outExpenses = await Expense.findAll({
      where: {
        [Op.and]: [
          { userId: { [Op.eq]: userId === null
            ? sequelize.col('userId') : Number(userId) } },
          { category: { [Op.in]: categories.length === 0
            ? [sequelize.col('category')] : categories } },
          { spentAt:
            { [Op.gte]:
              (from === null ? sequelize.col('spentAt') : new Date(from)) } },
          { spentAt:
            { [Op.lte]:
              (to === null ? sequelize.col('spentAt') : new Date(to)) } },
        ],
      },
    });

    res.send(outExpenses);
  });

  app.post('/expenses', express.json(), async(req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId === undefined || !spentAt
      || !title || amount === undefined || !category) {
      res.sendStatus(400);

      return;
    }

    const relatedUserId = await User.findByPk(userId);

    if (!relatedUserId) {
      res.sendStatus(400);

      return;
    }

    const expense = await Expense.create({
      userId,
      spentAt: new Date(spentAt),
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', async(req, res) => {
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expense);
  });

  app.delete('/expenses/:id', async(req, res) => {
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const result = await Expense.destroy({
      where: {
        id,
      },
    });

    if (result !== 1) {
      res.sendStatus(404);

      return;
    }
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), async(req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const { id } = req.params;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    if (userId === undefined && !spentAt
      && !title && amount === undefined && !category && !note) {
      res.sendStatus(400);

      return;
    }

    if (userId !== undefined) {
      const relatedUserId = await User.findByPk(userId);

      if (!relatedUserId) {
        res.sendStatus(400);

        return;
      }
    }

    const result = await Expense.update(
      {
        userId: userId === undefined ? sequelize.col('userId') : userId,
        spentAt: spentAt === undefined ? sequelize.col('spentAt') : spentAt,
        title: title === undefined ? sequelize.col('title') : title,
        amount: amount === undefined ? sequelize.col('amount') : amount,
        category: category === undefined ? sequelize.col('category') : category,
        note: note === undefined ? sequelize.col('note') : note,
      },
      {
        where: { id },
        returning: true,
      });

    if (result[0] === 0) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 200;
    res.send(result[1]);
  });

  return app;
}

module.exports = {
  createServer,
};
