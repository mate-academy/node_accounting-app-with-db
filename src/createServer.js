/* eslint-disable no-console */
'use strict';

const express = require('express');

const { models } = require('./models/models');
const { User, Category, Expense } = models;
const { userRouter } = require('./routers/user.router');
const { categoryRouter } = require('./routers/category.router');
const { expenseRouter } = require('./routers/expense.router');

const createServer = () => {
  const app = express();

  app.use(express.json());

  User.sync();
  Expense.sync();
  Category.sync();

  app.get('/', (req, res) => res.sendStatus(200));

  app.use('/users', userRouter);
  app.use('/categories', categoryRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = { createServer };
