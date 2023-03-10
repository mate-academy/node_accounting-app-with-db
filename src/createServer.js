'use strict';

const express = require('express');
const cors = require('cors');

const { setInitialUsers } = require('./services/users');
const { setInitialExpenses } = require('./services/expenses');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const server = express();

  setInitialUsers([]);
  setInitialExpenses([]);

  server.use(cors());
  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
