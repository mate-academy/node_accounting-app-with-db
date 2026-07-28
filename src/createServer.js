'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.use('/', userRouter);
  app.use('/', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
