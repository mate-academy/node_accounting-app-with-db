'use strict';

const express = require('express');
const cors = require('cors');

const usersServise = require('./services/users.js');
const expensesServise = require('./services/expenses.js');

const usersRouter = require('./routes/users.js');
const expensesRouter = require('./routes/expenses.js');

function createServer() {
  usersServise.getInitialValue();
  expensesServise.getInitialValue();

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
