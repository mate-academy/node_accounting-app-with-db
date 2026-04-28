'use strict';

const express = require('express');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');

const createServer = () => {
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
