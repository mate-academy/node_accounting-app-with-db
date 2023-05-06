'use strict';

const express = require('express');

const { recreateTables } = require('./utils/recreateTables');
const { router: userRouter } = require('./routes/users');
const { router: expensesRouter } = require('./routes/expenses');

async function createServer() {
  const app = express();

  await recreateTables();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
