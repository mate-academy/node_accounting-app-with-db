'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./api/users/users.router');
const { expensesRouter } = require('./api/expenses/expenses.router');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
