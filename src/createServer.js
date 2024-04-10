'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.route').router;
const expensesRouter = require('./routes/expenses.route').router;

function createServer() {
  const server = express();

  server.use(cors());

  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), express.query(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
