'use strict';

const express = require('express');
const { usersRouter } = require('./Routers/UserRouter');
const { expensesRouter } = require('./Routers/ExpensesRouter');

function createServer() {
  const server = express();

  server.use('/users', usersRouter);
  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
