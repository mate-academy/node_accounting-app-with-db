'use strict';

const userRouter = require('./routes/user.router');
const expenseRouter = require('./routes/expense.router');
const categoryRouter = require('./routes/category.router');

const express = require('express');

function createServer() {
  const server = express();

  server.use(express.json());

  server.use('/users', userRouter);
  server.use('/expenses', expenseRouter);
  server.use('/categories', categoryRouter);

  return server;
}

module.exports = {
  createServer,
};
