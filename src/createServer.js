'use strict';

const express = require('express');

const userRouter = require('./routes/user.router');
const expenseRouter = require('./routes/expense.router');
const categoryRouter = require('./routes/category.router');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);
  app.use('/categories', categoryRouter);

  return app;
}

module.exports = { createServer };
