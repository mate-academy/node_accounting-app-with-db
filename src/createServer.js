'use strict';

const express = require('express');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use('/categories', categoriesRouter);
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
