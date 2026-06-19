/* eslint-disable no-console */
'use strict';

const express = require('express');
const userRouter = require('./routes/users.router.js');
const expenseRouter = require('./routes/expense.router.js');

const createServer = () => {
  // your code goes here
  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
