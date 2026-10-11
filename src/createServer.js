'use strict';

const userRouter = require('./routers/users.router');
const expenseRouter = require('./routers/expenses.router');

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
