'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/users.route.js');
const { router: expenseRouter } = require('./routes/expenses.route.js');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/expenses', expenseRouter);
  app.use('/users', usersRouter);

  return app;
};

module.exports = {
  createServer,
};
