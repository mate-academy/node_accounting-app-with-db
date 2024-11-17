'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./api/expenses.router.js');
const { usersRouter } = require('./api/users.router.js');

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
