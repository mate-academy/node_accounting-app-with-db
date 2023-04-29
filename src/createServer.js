'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
