'use strict';

const express = require('express');

const { usersRoute } = require('./routes/user.route');
const { expenseRoute } = require('./routes/expense.route');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/users', usersRoute);
  app.use('/expenses', expenseRoute);

  app.use('*', (_, res) => {
    res.status(404).json({
      status: '404 - NOT FOUND',
      message: 'Route not found',
    });
  });

  return app;
};

module.exports = {
  createServer,
};
