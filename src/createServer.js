'use strict';

const { router: userRouter } = require('./routers/user.router.js');
const { router: expenseRouter } = require('./routers/expense.router.js');
const cors = require('cors');
const express = require('express');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
