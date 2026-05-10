'use strict';

const express = require('express');
const userRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');
const categoriesRouter = require('./routes/categories.route');

function createServer() {
  const app = express();
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  return app;
}

module.exports = {
  createServer,
};
