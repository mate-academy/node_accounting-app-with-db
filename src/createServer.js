'use strict';

const express = require('express');
const cors = require('cors');

const { usersRouter } = require('./routes/usersRouter.js');
const { expensesRouter } = require('./routes/expensesRouter.js');

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
