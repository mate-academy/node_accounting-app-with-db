'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routers/users-Routers');
const expensesRouter = require('./routers/expenses-Routers');
const usersService = require('./services/users-Services');
const expensesService = require('./services/expenses-Services');

function createServer() {
  usersService.clearUsers();
  expensesService.clearExpense();

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
}

module.exports = createServer;
