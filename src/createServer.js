'use strict';

const usersRouter = require('./routers/usersRouter.js');
const expenseRouter = require('./routers/expensesRouter.js');
const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  app.use(express.json());

  app.use('/', usersRouter(), expenseRouter());

  return app;
}

module.exports = {
  createServer,
};
