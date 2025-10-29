'use strict';

const express = require('express');
const userRouter = require('./routers/userRouters');
const expenseRouter = require('./routers/expenseRouters');

const createServer = () => {
  const app = express();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
