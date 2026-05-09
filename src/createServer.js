'use strict';

const userRouter = require('./routers/user.router');
const expenseRouter = require('./routers/expense.router');

const express = require('express');

function createServer() {
  const server = express();

  server.use(express.json());

  server.use('/users', userRouter);
  server.use('/expenses', expenseRouter);

  return server;
}

module.exports = {
  createServer,
};
