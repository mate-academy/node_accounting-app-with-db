const express = require('express');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { Op } = require('sequelize');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', async (req, res) => {
    const users = await User.findAll();

    res.status(200).json(users);
  });

  app.post('/users', async (req, res) => {
    const user = req.body;

    if (user.name === '' || !user.name) {
      res.status(400).json({ error: 'Name is required' });

      return;
    }

    const newUser = await User.create({ name: user.name });

    res.status(201).json(newUser);
  });

  app.get('/users/:id', async (req, res) => {
    const userUrl = req.params.id;
    const foundUser = await User.findByPk(userUrl);

    if (!foundUser) {
      res.status(404).json({ error: 'user does not exist' });

      return;
    }
    res.status(200).json(foundUser);
  });

  app.delete('/users/:id', async (req, res) => {
    const userUrl = req.params.id;
    const foundUser = await User.findByPk(userUrl);

    if (!foundUser) {
      res.status(404).json({ error: 'user does not exist' });

      return;
    }
    await foundUser.destroy();
    res.status(204).send();
  });

  app.patch('/users/:id', async (req, res) => {
    const userUrl = req.params.id;
    const foundUser = await User.findByPk(userUrl);
    const newUpdateUser = req.body;

    if (!foundUser) {
      res.status(404).json({ error: 'user does not exist' });

      return;
    }

    await foundUser.update(newUpdateUser);
    res.status(200).json(foundUser);
  });

  // rotas expenses
  app.get('/expenses', async (req, res) => {
    const expenseParams = req.query;
    const where = {};

    if (expenseParams.categories) {
      where.category = expenseParams.categories.split(',');
    }

    if (expenseParams.userId) {
      where.userId = expenseParams.userId;
    }

    if (expenseParams.from) {
      where.spentAt = where.spentAt || {};
      where.spentAt[Op.gte] = expenseParams.from;
    }

    if (expenseParams.to) {
      where.spentAt = where.spentAt || {};
      where.spentAt[Op.lte] = expenseParams.to;
    }

    const expensesList = await Expense.findAll({ where });

    res.status(200).json(expensesList);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!title || !amount || !userId || !spentAt) {
      res.status(400).json({ error: 'error 404, dada is form not null' });

      return;
    }

    const verificationUser = await User.findByPk(userId);

    if (!verificationUser) {
      res.status(400).json({ error: 'user is not acess' });

      return;
    }

    const newExpense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const expenseId = req.params.id;
    const foundExpense = await Expense.findByPk(expenseId);

    if (!foundExpense) {
      res.status(404).json({ error: 'expense is does exist' });

      return;
    }

    res.status(200).json(foundExpense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const expenseId = req.params.id;
    const foundExpense = await Expense.findByPk(expenseId);

    if (!foundExpense) {
      res.status(404).json({ error: 'error expense is does not exist' });

      return;
    }

    await foundExpense.destroy();
    res.status(204).send();
  });

  app.patch('/expenses/:id', async (req, res) => {
    const expenseId = req.params.id;
    const foundExpense = await Expense.findByPk(expenseId);
    const attExpense = req.body;

    if (!foundExpense) {
      res.status(404).json({ error: 'error expense is does not exist' });

      return;
    }

    await foundExpense.update(attExpense);
    res.status(200).json(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
