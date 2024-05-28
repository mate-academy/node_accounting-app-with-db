'use strict';

const express = require('express');

const { router: userRouter } = require('./routers/user.route');
const { router: expenseRouter } = require('./routers/expense.route');

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
