'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/user.route.js');
const { router: expensesRouter } = require('./routes/expenses.route.js');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = { createServer };
