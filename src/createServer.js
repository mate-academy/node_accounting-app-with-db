'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routers/users.router');
const { router: expensesRouter } = require('./routers/expenses.router');
const path = require('path');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  const absolutePath = path.resolve(__dirname, '..', 'client', 'build');

  app.use(express.static(absolutePath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });

  return app;
};

module.exports = {
  createServer,
};
