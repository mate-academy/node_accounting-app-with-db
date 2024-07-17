'use strict';

const cors = require('cors');
const express = require('express');
const usersRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');

const createServer = () => {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);

  app.use('/expenses', express.json(), expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
