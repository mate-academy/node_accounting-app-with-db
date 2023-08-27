'use strict';

const express = require('express');
const cors = require('cors');

const { router: userRouter } = require('./routes/user.router');
const { router: expenseRouter } = require('./routes/expense.router');

function createServer() {
  const app = express()
    .use(cors())
    .use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
