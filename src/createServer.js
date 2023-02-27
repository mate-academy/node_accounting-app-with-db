'use strict';

const express = require('express');

const { router: usersRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

const expensesService = require('./services/expenses');
const usersService = require('./services//users');

function createServer() {
  const app = express();

  app.use('/users', usersRouter);
  usersService.reset();

  app.use('/expenses', expensesRouter);
  expensesService.reset();

  return app;
}

module.exports = {
  createServer,
};
