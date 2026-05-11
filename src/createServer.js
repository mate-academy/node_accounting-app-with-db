'use strict';

const cors = require('cors');
const express = require('express');
const { router: usersRouter } = require('./routers/users.router.js');
const { router: expensesRouter } = require('./routers/expenses.router.js');

const createServer = () => {
  const app = express();

  app.use(cors(), express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
