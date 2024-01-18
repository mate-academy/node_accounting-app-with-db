'use strict';

const express = require('express');
const cors = require('cors');

const { router: expensesRouter } = require('./routes/expenses.route');
const { router: usersRouter } = require('./routes/users.route');

function createServer() {
  const server = express();

  server.use(cors(), express.json());

  server.use('/expenses', expensesRouter);
  server.use('/users', usersRouter);

  return server;
}

module.exports = {
  createServer,
};
