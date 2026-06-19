'use strict';

const express = require('express');
const cors = require('cors');
const expensesRouter = require('./routers/expenses.router.js');
const usersRouter = require('./routers/users.router.js');
const categoriesRouter = require('./routers/categories.router.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  return app;
}

module.exports = {
  createServer,
};
