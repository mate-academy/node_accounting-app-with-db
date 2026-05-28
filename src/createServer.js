/* eslint-disable no-console */
'use strict';

const express = require('express');
const routerUsers = require('./router/users.router.js');
const routerExpenses = require('./router/expense.router.js');
const routerCategories = require('./router/category.router.js');

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.use('/users', routerUsers);

  app.use('/expenses', routerExpenses);

  app.use('/categories', routerCategories);

  return app;
}

module.exports = {
  createServer,
};
