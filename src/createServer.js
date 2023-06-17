'use strict';

const { router: usersRouter } = require('./routes/user');
const { router: expensesRouter } = require('./routes/expenses');
const usersService = require('./services/users');
const expensesService = require('./services/expenses');

const cors = require('cors');

const express = require('express');

function createServer() {
  const app = express();

  usersService.resetStore();
  expensesService.resetStore();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
