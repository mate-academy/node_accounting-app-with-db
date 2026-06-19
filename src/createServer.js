'use strict';

const express = require('express');
const cors = require('cors');
const { createUsersRouter } = require('./api/users.router');
const { createExpensesRouter } = require('./api/expenses.router');
const { createCategoriesRouter } = require('./api/categories.router');
const { createUsersService } = require('./services/users.service');
const { createExpensesService } = require('./services/expenses.service');
const { createCategoriesService } = require('./services/categories.service');

function createServer() {
  const app = express();

  const usersService = createUsersService();
  const expensesService = createExpensesService();
  const categoriesService = createCategoriesService();

  app.use(express.json());
  app.use(cors());

  app.use('/users', createUsersRouter(usersService));
  app.use('/expenses', createExpensesRouter(expensesService, usersService));
  app.use('/categories', createCategoriesRouter(categoriesService));

  return app;
}

module.exports = {
  createServer,
};
