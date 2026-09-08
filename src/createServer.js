'use strict';

const express = require('express');
const usersRouters = require('./routes/users.routes');
const expensesRouters = require('./routes/expenses.routes');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  app.use('/users', usersRouters);
  app.use('/expenses', expensesRouters);

  return app;
};

module.exports = {
  createServer,
};
