'use strict';

const express = require('express');
const userRouter = require('./routers/userRouters');
const expenseRouter = require('./routers/expenseRouters');
const categoryRouter = require('./routers/categoryRouters');

const createServer = () => {
  const app = express();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);
  app.use('/categories', categoryRouter);

  return app;
};

module.exports = {
  createServer,
};
