'use strict';

const express = require('express');
const userRouter = require('./routes/user.route.js');
const expenseRouter = require('./routes/expense.route.js');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
