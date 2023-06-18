'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.listen(3000);

  return app;
}

createServer();

module.exports = {
  createServer,
};
