'use strict';

const express = require('express');
const { expensesRouter } = require('./expensesRouter');
const { usersRouter } = require('./usersRouter');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
