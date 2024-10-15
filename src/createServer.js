'use strict';

const express = require('express');
const cors = require('cors');

const { router: userRouter } = require('./routes/users.route');
const { router: expensesRoute } = require('./routes/expenses.route');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRoute);

  return app;
};

module.exports = {
  createServer,
};
