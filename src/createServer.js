'use strict';

const express = require('express');

const { router: userRouter } = require('./routers/user.route');
const { router: expenseRouter } = require('./routers/expense.route');

const createServer = () => {
  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
