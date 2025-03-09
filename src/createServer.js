'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routers/users.router');
const { router: expensesRouter } = require('./routers/expenses.router');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
