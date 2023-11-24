'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/user.route');
const { router: expensesRouter } = require('./routes/expenses.route');

function createServer() {
  const app = express();

  // Next two lines for tests
  // usersService.clearUsers();
  // expensessService.clearExpenses();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  return app;
}

module.exports = {
  createServer,
};
