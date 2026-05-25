'use strict';

const express = require('express');
const { router: usersRouter } = require('./routers/users.router.js');
const { router: expensesRouter } = require('./routers/expenses.router.js');
const { router: categoriesRouter } = require('./routers/categories.router.js');

const app = express();

const createServer = () => {
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  return app;
};

module.exports = { createServer };
