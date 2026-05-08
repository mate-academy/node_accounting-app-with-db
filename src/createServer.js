'use strict';

const express = require('express');
const userRouter = require('./routes/userRouters');
const expenseRouter = require('./routes/expenseRouters');
const categoryRouter = require('./routes/categoryRouters');

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
