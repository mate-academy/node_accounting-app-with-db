'use strict';

const express = require('express');
const { Category, User, Expense } = require('./models/models').models;

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/categories', async (req, res) => {
    const category = await Category.findAll();

    res.json(category);
  });

  app.post('/categories', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  });

  app.patch('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      res.sendStatus(404);

      return;
    }

    category.name = name;
    await category.save();

    res.status(200).json(category);
  });

  app.delete('/categories/:id', async (req, res) => {
    const { id } = req.params;
    const deleteCategory = await Category.destroy({ where: { id } });

    if (deleteCategory === 0) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await User.create({ name });

    res.status(201).json(user);
  });

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.status(200).json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deleteUser = await User.destroy({ where: { id } });

    if (deleteUser === 0) {
      res.sendStatus(404);

      return;
    }
    res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (name) {
      user.name = name;
      await user.save();
    }

    res.status(200).json(user);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      res.sendStatus(400);

      return;
    }

    const checkUser = await User.findByPk(userId);

    if (!checkUser) {
      res.sendStatus(400);

      return;
    }

    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const expenses = await Expense.findAll();
    let result = [...expenses];

    if (from) {
      const fromDate = new Date(from);

      result = result.filter((data) => new Date(data.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      result = result.filter((data) => new Date(data.spentAt) <= toDate);
    }

    if (categories) {
      const categoryList = categories.split(',');

      result = result.filter((data) => categoryList.includes(data.category));
    }

    if (userId) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    res.json(result);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const deleteExpense = await Expense.destroy({ where: { id } });

    if (deleteExpense.length === 0) {
      res.sendStatus(404);

      return;
    }
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const expens = await Expense.findByPk(id);

    if (!expens) {
      res.sendStatus(404);

      return;
    }

    if (userId) {
      const checkUser = await User.findByPk(userId);

      if (!checkUser) {
        res.sendStatus(404);

        return;
      }
    }

    Object.assign(expens, req.body);
    await expens.save();

    res.status(200).json(expens);
  });

  return app;
}

module.exports = {
  createServer,
};
