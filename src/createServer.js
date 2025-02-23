'use strict';

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', userRouter.router);
  app.use('/expenses', expenseRouter.router);

  return app;
}

module.exports = {
  createServer,
};
