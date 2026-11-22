'use strict';

const express = require('express');
const { createUserService } = require('./services/Users.service');
const { createUserController } = require('./controllers/Users.controller');
const { createUserRouter } = require('./routers/UsersRouter');

const { createExpensesService } = require('./services/Expenses.service');
const {
  createExpensesController,
} = require('./controllers/Expenses.controller');
const { createExpensesRouter } = require('./routers/ExpensesRouter');

function createServer() {
  const userService = createUserService();
  const userController = createUserController(userService);
  const userRouter = createUserRouter(userController);

  const expensesService = createExpensesService();
  const expensesController = createExpensesController(
    expensesService,
    userService,
  );
  const expensesRouter = createExpensesRouter(expensesController);

  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
