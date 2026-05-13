'use strict';
// const { v4: uuidv4 } = require('uuid');

const express = require('express');
const cors = require('cors');

const { createUsersService } = require('./services/users.service.js');
const { createExpensesService } = require('./services/expenses.service.js');

const { createUserRouter } = require('./routes/user.route.js');
const { createExpenseRouter } = require('./routes/expense.route.js');

function createServer() {
  const app = express();

  const usersService = createUsersService();
  const expensesService = createExpensesService();

  const userRouter = createUserRouter(usersService);
  const expenseRouter = createExpenseRouter(usersService, expensesService);

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
