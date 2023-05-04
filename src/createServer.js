'use strict';

const express = require('express');

function createServer() {
  const cors = require('cors');
  const { router: usersRouter } = require('./routes/users.js');
  const { router: expensesRouter } = require('./routes/expenses.js');
  const expensesService = require('./services/expensesService.js');
  const userService = require('./services/usersService.js');

  expensesService.reset();
  userService.reset();

  const app = express();

  app.use(cors());
  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports.createServer = createServer;
