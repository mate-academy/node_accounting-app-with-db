'use strict';

const express = require('express');
const cors = require('cors');

const { routerUser } = require('./routes/users');
const { routerExpense } = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), routerUser);
  app.use('/expenses', express.json(), routerExpense);

  return app;
}

module.exports = {
  createServer,
};
