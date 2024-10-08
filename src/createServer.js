'use strict';

const express = require('express');
const usersService = require('./services/usersService');
const expensesService = require('./services/expensesService');
const usersRouter = require('./routes/usersRouter');
const expensesRouter = require('./routes/expensesRouter');

const createServer = () => {
  usersService.init();
  expensesService.init();

  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
