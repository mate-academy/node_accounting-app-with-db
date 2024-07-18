'use strict';

const express = require('express');
const cors = require('cors');
const router = require('./routers');

const expensesService = require('./services/expenses.services');
const usersService = require('./services/users.services');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/', router);

  expensesService.deleteExpenses();
  usersService.deleteUsers();

  return app;
};

module.exports = {
  createServer,
};
