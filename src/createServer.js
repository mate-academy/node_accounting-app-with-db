'use strict';

const express = require('express');

const expenseRouter = require('./routes/expense.route');
const userRouter = require('./routes/user.route');

function createServer() {
  const server = express();

  server.use('/expenses', express.json(), expenseRouter);
  server.use('/users', express.json(), userRouter);

  return server;
}

module.exports = {
  createServer,
};
