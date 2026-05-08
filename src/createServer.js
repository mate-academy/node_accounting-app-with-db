'use strict';

const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('./models/User.model');

const {
  getCategories,
  // createCategory,
  // getCategoryById,
  // deleteCategory,
  // updateCategory,
} = require('./models/User.model');

const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('./models/Expense.model');

const express = require('express');

const createServer = () => {
  const app = express();

  app.get('/users', express.json(), async (req, res) => {
    try {
      const users = await getUsers();

      res.status(200).send(users);
    } catch (e) {
      res.status(500).end();
    }
  });

  app.get('/users/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const currentUser = await getUser(id);

    if (!id) {
      res.status(400).send('user id is not provided');

      return;
    }

    if (!currentUser) {
      res.status(404);
      res.send('User not found');

      return;
    }

    res.status(200).send(currentUser);
  });

  app.post('/users', express.json(), async (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.status(400).send('Name is not provided or invalid');

      return;
    }

    const newUser = await createUser(name);

    if (!newUser) {
      res.status(400).send('Name is not provided');

      return;
    }

    res.status(201).send(newUser);
  });

  app.delete('/users/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);

    if (!user) {
      res.status(404).send('Not Found');

      return;
    }

    await deleteUser(id);

    res.status(204).send();
  });

  app.patch('/users/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);

    if (!user) {
      res.status(404).send('Not Found');

      return;
    }

    const result = await updateUser(+id, req.body.name);

    res.status(200).json(result[1][0]);
  });

  app.get('/categories', express.json(), async (req, res) => {
    try {
      const categories = await getCategories();

      res.status(200).send(categories);
    } catch (e) {
      res.status(404).send('Not Found');
    }
  });

  app.get('/expenses', express.json(), async (req, res) => {
    let expenses = await getExpenses();
    const { userId, categories, from, to } = req.query;

    if (userId) {
      expenses = expenses.filter((exp) => exp?.userId === Number(userId));
    }

    if (categories) {
      expenses = expenses.filter((exp) => exp?.category === categories);
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      expenses = expenses.filter(
        (exp) =>
          new Date(exp?.spentAt) >= fromDate &&
          new Date(exp?.spentAt) <= toDate,
      );
    }

    res.status(200);

    return res.send(expenses);
  });

  app.get('/expenses/:id', express.json(), async (req, res) => {
    const { id } = req.params;

    const exp = await getExpenseById(id);

    if (!exp) {
      res.status(404);
      res.send('Not Found');

      return;
    }

    res.status(200).send(exp);
  });

  app.post('/expenses', express.json(), async (req, res) => {
    const { title, amount, category, userId, note, spentAt } = req.body;

    if (!title || !amount || !userId || !(await getUser(userId))) {
      res.status(400).send('Bad Request');

      return;
    }

    const newExpense = await createExpense({
      userId,
      title,
      amount,
      category,
      note,
      spentAt,
    });

    res.status(201).send(newExpense);
  });

  app.patch('/expenses/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const exp = await getExpenseById(id);

    if (!exp) {
      res.status(404).send('Not Found');

      return;
    }

    const result = await updateExpense(id, req.body);

    res.status(200).send(result[1][0]);
  });

  app.delete('/expenses/:id', express.json(), async (req, res) => {
    const id = Number(req.params.id);
    const exp = await getExpenseById(id);

    if (!exp) {
      res.status(404).send('Not Found');

      return;
    }

    await deleteExpense(id);
    res.status(204).send();
  });

  return app;
};

module.exports = {
  createServer,
};
