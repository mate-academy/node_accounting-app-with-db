'use strict';

const express = require('express');

const cors = require('cors');

const {
  usersRouter,
} = require('./routes/usersRouter');

const {
  init: usersInit,
} = require('./services/userServices');

const {
  expensesRouter,
} = require('./routes/expensesRouter');

const {
  init: expensesInit,
} = require('./services/expenseServices');

function createServer() {
  usersInit();
  expensesInit();

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
