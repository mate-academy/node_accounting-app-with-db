'use strict';

const usersRouter = require('./routes/users.routes.js');
const expensesRouter = require('./routes/expenses.routes.js');

const express = require('express');
const cors = require('cors');
const { User } = require('./models/User.model.js');
const { Expense } = require('./models/Expense.model.js');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter(User));
  app.use('/expenses', expensesRouter(User, Expense));

  return app;
}

module.exports = {
  createServer,
};
