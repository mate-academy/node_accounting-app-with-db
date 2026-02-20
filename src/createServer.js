'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./entity/users.routes.mjs');
const { router: expensesRouter } = require('./entity/expenses.routes.mjs');

function createServer() {
  const app = express();

  app.use(cors());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};

createServer().listen(3005);
