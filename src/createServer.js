'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/user.routes');
const { router: expensesRouter } = require('./routes//expense.routes');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = { createServer };
