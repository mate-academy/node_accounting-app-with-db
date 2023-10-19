'use strict';

const express = require('express');
const cors = require('cors');

const { router: usersRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
