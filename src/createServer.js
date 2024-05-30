'use strict';

const express = require('express');
const usersRouter = require('./routes/users.routes.js');
const expensesRouter = require('./routes/expenses.route.js');

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
