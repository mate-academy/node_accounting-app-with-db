'use strict';

const express = require('express');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');

const createServer = () => {
  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
