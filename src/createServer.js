'use strict';

const express = require('express');
const { expensesRouter } = require('./expensesRouter');
const { usersRouter } = require('./usersRouter');
const { sequelize } = require('./db');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  sequelize.sync();

  return app;
}

module.exports = {
  createServer,
};
