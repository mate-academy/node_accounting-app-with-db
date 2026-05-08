'use strict';

const express = require('express');
const usersRouter = require('./api/routers/users.router');
const expensesRouter = require('./api/routers/expenses.router');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
