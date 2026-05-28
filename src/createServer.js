'use strict';

const { Op } = require('sequelize');
const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');
const { Category } = require('./models/Category.model');

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  app.post('/users', async (request, response) => {
    const { name } = request.body;

    if (!name) {
      response.status(400).json({ error: 'Name is required' });

      return;
    }

    const user = await User.create({ name });

    response.status(201).json(user);
  });

  app.get('/users', async (request, response) => {
    const users = await User.findAll();

    response.status(200).json(users || []);
  });

  app.get('/users/:id', async (request, response) => {
    const id = Number(request.params.id);
    const user = await User.findByPk(id);

    if (!user) {
      response.status(404).json({ error: 'User not found' });

      return;
    }

    response.status(200).json(user);
  });

  app.patch('/users/:id', async (request, response) => {
    const id = Number(request.params.id);
    const user = await User.findByPk(id);

    if (!user) {
      response.status(404).json({ error: 'User not found' });

      return;
    }

    delete request.body.id;

    await user.update(request.body);

    response.status(200).json(user);
  });

  app.delete('/users/:id', async (request, response) => {
    const id = Number(request.params.id);
    const user = await User.findByPk(id);

    if (!user) {
      response.status(404).json({ error: 'User not found' });

      return;
    }

    await User.destroy({ where: { id } });

    response.status(204).send();
  });

  app.post('/expenses', async (request, response) => {
    const { userId, spentAt, title, amount } = request.body;

    if (!userId || !spentAt || !title || amount === undefined) {
      response.status(400).json({ error: 'All fields are required' });

      return;
    } else if (!(await User.findByPk(userId))) {
      response.status(400).json({ error: 'User not found' });

      return;
    }

    const newExpense = await Expense.create(request.body);

    response.status(201).json(newExpense);
  });

  app.get('/expenses', async (request, response) => {
    const whereCondition = {};
    const { userId, from, to, categories } = request.query;

    if (userId) {
      whereCondition.userId = request.query.userId;
    }

    if (categories) {
      const categoriesArray = Array.isArray(categories)
        ? categories
        : [categories];

      whereCondition.category = { [Op.in]: categoriesArray };
    }

    if (from && to) {
      whereCondition.spentAt = {
        [Op.gte]: from,
        [Op.lte]: to,
      };
    }

    const filteredExpenses = await Expense.findAll({ where: whereCondition });

    response.status(200).json(filteredExpenses || []);
  });

  app.get('/expenses/:id', async (request, response) => {
    const id = Number(request.params.id);
    const expense = await Expense.findByPk(id);

    if (!expense) {
      response.status(404).json({ error: 'Expense not found' });

      return;
    }

    response.status(200).json(expense);
  });

  app.patch('/expenses/:id', async (request, response) => {
    const id = Number(request.params.id);
    const expense = await Expense.findByPk(id);

    if (!expense) {
      response.status(404).json({ error: 'Expense not found' });

      return;
    }

    delete request.body.id;

    await expense.update(request.body);

    response.status(200).json(expense);
  });

  app.delete('/expenses/:id', async (request, response) => {
    const id = Number(request.params.id);
    const expense = await Expense.findByPk(id);

    if (!expense) {
      response.status(404).json({ error: 'Expense not found' });

      return;
    }

    await Expense.destroy({ where: { id } });

    response.status(204).send();
  });

  app.post('/categories', async (request, response) => {
    const { name } = request.body;

    if (!name) {
      response.status(400).json({ error: 'Category is required' });

      return;
    }

    const category = await Category.create({ name });

    response.status(201).json(category);
  });

  app.get('/categories', async (request, response) => {
    const categories = await Category.findAll();

    response.status(200).json(categories || []);
  });

  app.get('/categories/:id', async (request, response) => {
    const id = Number(request.params.id);
    const category = await Category.findByPk(id);

    if (!category) {
      response.status(404).json({ error: 'Category not found' });

      return;
    }

    response.status(200).json(category);
  });

  app.patch('/categories/:id', async (request, response) => {
    const id = Number(request.params.id);
    const category = await Category.findByPk(id);

    if (!category) {
      response.status(404).json({ error: 'Category not found' });

      return;
    }

    delete request.body.id;

    await category.update(request.body);

    response.status(200).json(category);
  });

  app.delete('/categories/:id', async (request, response) => {
    const id = Number(request.params.id);
    const category = await Category.findByPk(id);

    if (!category) {
      response.status(404).json({ error: 'Category not found' });

      return;
    }

    await Category.destroy({ where: { id } });

    response.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
