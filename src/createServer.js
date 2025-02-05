'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routes/expenses.router.js');
const { usersRouter } = require('./routes/users.router.js');

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
