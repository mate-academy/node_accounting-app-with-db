'use strict';

const express = require('express');
const { router: expensesRouter } = require('../routers/expenses');
const { router: usersRouter } = require('../routers/users');

const createServer = (port) => {
  const app = express();

  app.use(express.json());

  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);

  app.listen(port);
};

module.exports = {
  createServer,
};
