'use strict';

const express = require('express');
const { usersRouter } = require('./routers/users.router');
const { expensesRouter } = require('./routers/expenses.router');

const createServer = () => {
  const server = express();

  server.use(express.json());

  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  return server;
};

module.exports = {
  createServer,
};
