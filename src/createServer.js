'use strict';

const express = require('express');
const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');
const { Op } = require('sequelize');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/expenses', async (req, res) => {
    const { userId, categories, from, to } = req.query;
    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (categories) {
      where.category = { [Op.in]: categories.split(',') };
    }

    if (from) {
      where.spentAt = { ...where.spentAt, [Op.gte]: from };
    }

    if (to) {
      where.spentAt = { ...where.spentAt, [Op.lte]: to };
    }

    const result = await Expense.findAll({ where });

    res.status(200).send(result);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const getById = await Expense.findByPk(id);

    if (!getById) {
      return res.status(404).send('Not found');
    }

    res.status(200).send(getById);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      return res.status(400).send('Name is not provided');
    }

    const userExists = await User.findByPk(userId);

    if (!userExists) {
      return res.status(400).send('User not found');
    }

    const newExpens = await Expense.create({
      userId: userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note,
    });

    res.status(201).json(newExpens);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const expenseExists = await Expense.findByPk(id);

    if (!expenseExists) {
      return res.status(404).send('Not found');
    }

    await Expense.destroy({
      where: {
        id,
      },
    });

    res.status(204).send();
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const getById = await Expense.findByPk(id);
    const { userId, spentAt, title, amount, category, note } = req.body;
    const expenseToUpdate = {};

    if (!getById) {
      return res.status(404).send('Not found');
    }

    if (userId !== undefined) {
      expenseToUpdate.userId = userId;
    }

    if (category !== undefined) {
      expenseToUpdate.category = category;
    }

    if (spentAt !== undefined) {
      expenseToUpdate.spentAt = spentAt;
    }

    if (note !== undefined) {
      expenseToUpdate.note = note;
    }

    if (amount !== undefined) {
      expenseToUpdate.amount = amount;
    }

    if (title !== undefined) {
      expenseToUpdate.title = title;
    }

    const [, updatedExpenses] = await Expense.update(expenseToUpdate, {
      where: { id: id },
      returning: true,
    });

    res.status(200).send(updatedExpenses[0]);
  });

  app.get('/users', async (req, res) => {
    const result = await User.findAll();

    res.status(200).send(result);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const getById = await User.findByPk(id);

    if (!getById) {
      return res.status(404).send('Not found');
    }

    res.send(getById);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is not provided');
    }

    const newUsers = await User.create({
      name: name,
    });

    res.status(201).json(newUsers);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const userExists = await User.findByPk(id);

    if (!userExists) {
      return res.status(404).send('User not found');
    }

    await User.destroy({
      where: {
        id,
      },
    });

    res.status(204).send();
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const getById = await User.findByPk(id);

    if (!getById) {
      return res.status(404).send('Not found');
    }

    const [, updatedUser] = await User.update(
      { name },
      {
        where: { id: id },
        returning: true,
      },
    );

    res.status(200).send(updatedUser[0]);
  });

  return app;
}

module.exports = {
  createServer,
};
