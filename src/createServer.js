/* eslint-disable no-console */
'use strict';

const express = require('express');
const userService = require('./services/user.service.js');
const expenseService = require('./services/expense.service.js');
const userRouter = require('./routes/user.routes.js');
const expenseRouter = require('./routes/expense.routes.js');

function createServer() {
  const app = express();

  app.use(express.json());

  userService.init();
  expenseService.init();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

  return app;
}

module.exports = {
  createServer,
};
