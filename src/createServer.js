'use strict';

const express = require('express');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

const createServer = () => {
  const app = express();

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  });

  app.post('/users', express.json(), async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await User.create({ name });

    res.status(201).send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await User.update({ name }, { where: { id } });

    const updatedUser = await User.findByPk(id);

    res.send(updatedUser);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;

    let newExpenses = await Expense.findAll();

    if (userId) {
      newExpenses = newExpenses.filter((exp) => exp.userId === +userId);
    }

    if (categories) {
      const categoriesArr = Array.isArray(categories)
        ? categories
        : categories.split(',');

      newExpenses = newExpenses.filter(
        (exp) => categoriesArr.includes(exp.category),
        // eslint-disable-next-line function-paren-newline
      );
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      newExpenses = newExpenses.filter((exp) => {
        const spentDate = new Date(exp.spentAt);

        return spentDate >= fromDate && spentDate <= toDate;
      });
    }

    res.send(newExpenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expense);
  });

  app.post('/expenses', express.json(), async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const users = await User.findAll();

    if (
      !userId ||
      !spentAt ||
      !title ||
      !amount ||
      !users.some((user) => user.id === +userId)
    ) {
      res.sendStatus(400);

      return;
    }

    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category: category || null,
      note: note || null,
    });

    res.status(201).send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const deletedCount = await Expense.destroy({ where: { id } });

    if (deletedCount === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    await Expense.update(
      {
        spentAt,
        title,
        amount,
        category,
        note,
      },
      { where: { id } },
    );

    const updatedExpense = await Expense.findByPk(id);

    res.send(updatedExpense);
  });

  return app;
};

module.exports = {
  createServer,
};
