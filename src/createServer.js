'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { expenseRouter } = require('./routes/expense.route');
const { categoryRouter } = require('./routes/category.route');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);
  app.use('/categories', categoryRouter);

  return app;
}

module.exports = {
  createServer,
};
