'use strict';

const express = require('express');

const { createUsersService } = require('./models/User.model');
const { createUsersController } = require('./controllers/users.controller');
const { createUsersRouter } = require('./routers/users.router');

const { createExpensesService } = require('./models/Expense.model');
const {
  createExpensesController,
} = require('./controllers/expenses.controller');
const { createExpensesRouter } = require('./routers/expenses.router');

function createServer() {
  const app = express();

  const usersService = createUsersService();
  const usersController = createUsersController(usersService);
  const usersRouter = createUsersRouter(usersController);

  const expensesService = createExpensesService(usersService);
  const expensesController = createExpensesController(expensesService);
  const expensesRouter = createExpensesRouter(expensesController);

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
