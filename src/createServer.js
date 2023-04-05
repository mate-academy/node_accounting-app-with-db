/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');

const expensesRouter = require('./routes/expenses');
const usersRouter = require('./routes/users');

function createServer() {
  const server = express();

  server.use(cors());
  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
