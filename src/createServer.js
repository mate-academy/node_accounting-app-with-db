/* eslint-disable no-console */
'use strict';

const express = require('express');
const expensesRouter = require('./routes/expenses.route');
const usersRouter = require('./routes/users.route');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/expenses', expensesRouter.router);
  app.use('/users', usersRouter.router);

  return app;
};

module.exports = {
  createServer,
};
