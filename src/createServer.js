'use strict';

const express = require('express');
const cors = require('cors');
const { router: userRouter } = require('./routes/user.route.js');
const { router: expenseRouter } = require('./routes/expense.route.js');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
