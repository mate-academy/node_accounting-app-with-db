'use strict';

const express = require('express');

const { userRouter, expenseRouter } = require('./routers/routers');

const createServer = () => {
  // your code goes here
  const server = express();

  server.use(express.json());

  server.use('/users', userRouter);
  server.use('/expenses', expenseRouter);

  return server;
};

module.exports = {
  createServer,
};
