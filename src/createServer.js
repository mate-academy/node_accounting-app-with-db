'use strict';

const express = require('express');
const cors = require('cors');
const expensesRouter = require('./route/expenses.route');
const usersRouter = require('./route/user.route');

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
