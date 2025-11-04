'use strict';

const cors = require('cors');
const express = require('express');
const userRouter = require('./routers/user.router.js');
const expensesRouter = require('./routers/expenses.router.js');
const categoriesRouter = require('./routers/categories.router.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  return app;
}

module.exports = {
  createServer,
};
