'use strict';

const express = require('express');
const usersRouter = require('./routes/users.router');
const expenseRouter = require('./routes/expense.router');

function createServer() {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
