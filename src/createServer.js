/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/User.routes.js');
const expensesRouter = require('./routes/Expense.routes.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
