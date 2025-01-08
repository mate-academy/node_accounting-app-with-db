'use strict';

const cors = require('cors');
const express = require('express');
const userRouter = require('./routers/user.router');
const expensesRouter = require('./routers/expense.router');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
