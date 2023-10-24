'use strict';

const express = require('express');
const { usersRouter } = require('./users/users.router');
const { usersService } = require('./users/users.service');
const { expensesService } = require('./expenses/expenses.service');
const { expensesRouter } = require('./expenses/expenses.router');

function createServer() {
  const server = express();

  usersService.clearUsers();
  expensesService.clearExpenses();

  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
