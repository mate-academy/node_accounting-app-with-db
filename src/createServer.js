'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.routes');
const expensesRouter = require('./routes/expenses.routes');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter());
  app.use('/expenses', expensesRouter());

  return app;
};

module.exports = {
  createServer,
};
