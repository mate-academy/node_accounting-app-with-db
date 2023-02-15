'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const server = express();

  server.use(cors());

  server.use('/users', usersRouter);

  server.use('/expenses', expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
