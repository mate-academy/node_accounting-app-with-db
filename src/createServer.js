'use strict';

const express = require('express');
const usersRouter = require('./users/users.router.js');
const expensesRouter = require('./expenses/expenses.router.js');

const createServer = () => {
  // your code goes here
  const app = express();

  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
