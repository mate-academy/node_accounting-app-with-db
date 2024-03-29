'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');

const createServer = () => {
  const server = express();

  server.use(cors());
  server.use('/users', userRouter);
  server.use('/expenses', expenseRouter);

  return server;
};

module.exports = {
  createServer,
};
