'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./routes/Users.router');
const { expensesRouter } = require('./routes/Expenses.router');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
