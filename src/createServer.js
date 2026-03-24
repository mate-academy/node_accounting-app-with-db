'use strict';

const express = require('express');

const usersRouter = require('./routers/users.router');
const expensesRouter = require('./routers/expenses.router');
const categoriesRouter = require('./routers/categories.router');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  return app;
}

module.exports = {
  createServer,
};
