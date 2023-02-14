'use strict';

const express = require('express');
const cors = require('cors');

const usersService = require('./services/users');
const expensesService = require('./services/expenses');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const server = express();

  server.use(cors());

  usersService.initialUsers();
  expensesService.initialExpenses();

  server.use('/users', usersRouter);

  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
