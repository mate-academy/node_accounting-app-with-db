'use strict';

const express = require('express');

const userController = require('./controllers/user.controller');
const expenseController = require('./controllers/expense.controller');
const categoryController = require('./controllers/category.controller');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userController);
  app.use('/expenses', expenseController);
  app.use('/categories', categoryController);

  return app;
}

module.exports = {
  createServer,
};
