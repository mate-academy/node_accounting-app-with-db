'use strict';

const express = require('express');
const createExpensesRouter = require('./routes/expenses');
const createUsersRouter = require('./routes/users');
const createCategoriesRouter = require('./routes/categories');

function createServer() {
  const app = express();

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  app.use(express.json());

  app.use('/expenses', createExpensesRouter());
  app.use('/users', createUsersRouter());
  app.use('/categories', createCategoriesRouter());

  return app;
}

module.exports = {
  createServer,
};
