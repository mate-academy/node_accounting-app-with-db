'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users.route');
const expensesRouter = require('./routes/expenses.route');
const app = express();

function createServer() {
  app.use(cors());

  app.use('/users', express.json(), userRouter.router);

  app.use('/expenses', express.json(), expensesRouter.router);

  return app;
}

module.exports = {
  createServer,
};
