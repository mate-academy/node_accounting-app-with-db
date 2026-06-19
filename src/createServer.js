'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users.router.js');
const expensesRouter = require('./routes/expenses.router.js');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
