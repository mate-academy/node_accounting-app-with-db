'use strict';

const express = require('express');
const usersRouter = require('./routers/users.router');
const expensesRouter = require('./routers/expenses.router');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
