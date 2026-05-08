'use strict';

const express = require('express');
const routerUsers = require('./router/users.router.js');
const routerExpenses = require('./router/expenses.router.js');
const routerCategories = require('./router/categories.router.js');

const createServer = () => {
  const app = express();

  app.use(express.json());

  // app.get('/', (req, res) => {

  // })

  app.use('/users', routerUsers);
  app.use('/expenses', routerExpenses);
  app.use('/categories', routerCategories);

  return app;
};

module.exports = {
  createServer,
};
