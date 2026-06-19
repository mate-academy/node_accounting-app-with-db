'use strict';

const express = require('express');
const { routerUsers } = require('./routes/usersRoute');
const { routerExpenses } = require('./routes/expensesRoute');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', routerUsers);
  app.use('/expenses', routerExpenses);

  return app;
}

module.exports = {
  createServer,
};
