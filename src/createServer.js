'use strict';

const express = require('express');
const cors = require('cors');
const userRepository = require('./entity/user.repository');
const expenseRepository = require('./entity/expense.repository');
const categoryRepository = require('./entity/category.repository');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/users', async (req, res) => {
    const users = await userRepository.getAll();

    res.json(users);
  });

  app.get('/users/:id', async (req, res) => {
    const id = +req.params.id;
    const user = await userRepository.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  });

  app.post('/users', async (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await userRepository.create(name);

    res.status(201).json(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const id = +req.params.id;
    const user = await userRepository.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await userRepository.deleteById(id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const { name } = req.body;

    const user = await userRepository.getById(+req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = await userRepository.update({
      id: +req.params.id,
      name,
    });

    res.json(updatedUser);
  });

  app.get('/expenses', async (req, res) => {
    const userId = +req.query.userId;
    const from = req.query.from;
    const to = req.query.to;
    const categories = req.query.categories;

    const expenses = await expenseRepository.getExpenses(
      userId,
      from,
      to,
      categories,
    );

    res.json(expenses);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = +req.params.id;
    const expense = await expenseRepository.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount) {
      return res.sendStatus(400);
    }

    const user = await userRepository.getById(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = await expenseRepository.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = +req.params.id;
    const expense = await expenseRepository.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expenseRepository.deleteById(id);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { spentAt, title, amount, category, note } = req.body;

    const expense = await expenseRepository.getById(+req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const updatedExpense = await expenseRepository.update({
      id: +req.params.id,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.json(updatedExpense);
  });

  app.get('/categories', async (req, res) => {
    const categories = await categoryRepository.getAll();

    res.json(categories);
  });

  app.get('/categories/:id', async (req, res) => {
    const id = +req.params.id;
    const category = await categoryRepository.getById(id);

    if (!category) {
      return res.sendStatus(404);
    }

    res.json(category);
  });

  app.post('/categories', async (req, res) => {
    const category = req.body.category;

    if (!category) {
      return res.sendStatus(400);
    }

    const createdCategory = await categoryRepository.create(category);

    res.status(201).json(createdCategory);
  });

  app.delete('/categories/:id', async (req, res) => {
    const id = +req.params.id;
    const category = await categoryRepository.getById(id);

    if (!category) {
      return res.sendStatus(404);
    }

    await categoryRepository.deleteById(id);

    res.sendStatus(204);
  });

  app.patch('/categories/:id', async (req, res) => {
    const { category } = req.body;

    const foundCategory = await categoryRepository.getById(+req.params.id);

    if (!foundCategory) {
      return res.sendStatus(404);
    }

    const updatedCategory = await categoryRepository.update({
      id: +req.params.id,
      category,
    });

    res.json(updatedCategory);
  });

  return app;
}

module.exports = {
  createServer,
};
