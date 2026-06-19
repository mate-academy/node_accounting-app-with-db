'use strict';

const express = require('express');
const cors = require('cors');

const { expensesRoute } = require('./controllers/expenses.controller.js');
const { usersRoute } = require('./controllers/users.controller.js');
const { categoriesRoute } = require('./controllers/categories.controller.js');

function createServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use('/expenses', expensesRoute);
  app.use('/users', usersRoute);
  app.use('/categories', categoriesRoute);

  return app;
}

module.exports = {
  createServer,
};
