'use strict';

const express = require('express');
const cors = require('cors');
const { usersService } = require('./services/usersService.js');
const { expensesService } = require('./services/expensesService.js');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  });

  app.get('/users', async (req, res) => {
    usersService
      .getAll()
      .then((users) => {
        res.status(200).json(users);
      })
      // eslint-disable-next-line handle-callback-err
      .catch((err) => res.status(500).json({ message: 'Server error' }));
  });

  app.post('/users', (req, res) => {
    const name = req.body.name;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    usersService
      .create(name)
      .then((createdUser) => {
        // console.log(createdUser);

        res.status(201).json(createdUser);
      })
      .catch((err) => res.status(500).json({ message: err }));
  });

  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    usersService
      .getUserById(userId)
      .then((someUser) => {
        res.status(200).json(usersService.normalize(someUser));
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    if (userId === undefined) {
      res.sendStatus(400);

      return;
    }

    usersService
      .deleteUserById(userId)
      .then((someUser) => res.sendStatus(204))
      .catch(() => {
        res.sendStatus(404);
      });
  });

  app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    const name = req.body.name;

    if (!name || !userId) {
      res.sendStatus(400);

      return;
    }

    usersService
      .patchItem(userId, name)
      .then((updatedUser) => res.status(200).json(updatedUser))
      .catch(() => res.sendStatus(404));
  });

  app.get('/expenses', async (req, res) => {
    const expenses = await expensesService.getAll(req.query);

    res.status(200).json(expenses);
  });

  app.post('/expenses', async (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (!spentAt || !title || !amount || !userId) {
      return res.sendStatus(400);
    }

    const user = await expensesService.findUser(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const expense = await expensesService
      .createExpense({
        spentAt,
        title,
        amount,
        userId,
        category,
        note,
      })
      .catch((err) => {
        throw err;
      });

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
      res.status(400).json('Bad request');

      return;
    }

    const expense = await expensesService.getExpenseById(id);

    if (!expense) {
      res.status(404).json('Not found');

      return;
    }

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const deletedExpense = await expensesService.deleteExpenseById(id);

    if (!deletedExpense) {
      res.sendStatus(404);

      return;
    }

    res.status(204).json(deletedExpense);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    const updateExpense = expensesService.getExpenseById(id);

    if (updateExpense === undefined) {
      res.status(404).json('Not found');

      return;
    }

    const updatedExpense = await expensesService.updateExpenseById(id, body);

    res.status(200).json(updatedExpense);
  });

  return app;
}

module.exports = { createServer };
