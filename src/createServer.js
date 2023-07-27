'use strict';

const express = require('express');
const { userRouter } = require('./routers/users.router');
const cors = require('cors');
const {
  errorHandlerMiddleware,
} = require('./middlewares/errorHandler.middleware');
const { expensesRouter } = require('./routers/expenses.router');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);
  app.use(errorHandlerMiddleware);

  return app;
};

module.exports = { createServer };
