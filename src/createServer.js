'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/usersRouter');
const { router: expensesRouter } = require('./routes/expensesRouter');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
