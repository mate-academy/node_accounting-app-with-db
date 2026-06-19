'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routers/users.router');
const { router: expensesRouter } = require('./routers/expenses.router');
// const { User } = require('./models/User.model');
// const { Expense } = require('./models/Expense.model');

function createServer() {
  const app = express();

  app.use(cors());
  // User.sync();
  // Expense.sync();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
