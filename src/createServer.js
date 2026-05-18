'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routes/expenses.router');
const { usersRouter } = require('./routes/users.router');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/expenses', express.json(), expensesRouter);
  app.use('/users', express.json(), usersRouter);

  return app;
}

module.exports = {
  createServer,
};
