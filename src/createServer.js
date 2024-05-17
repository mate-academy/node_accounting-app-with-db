'use strict';

const express = require('express');
const { routerExpenses } = require('./routers/router.expenses');
const { routerUsers } = require('./routers/router.user');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/users', routerUsers);
  app.use('/expenses', routerExpenses);

  return app;
};

module.exports = {
  createServer,
};
