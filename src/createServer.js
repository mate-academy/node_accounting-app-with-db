'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routers/user.router');
const { router: expensesRouter } = require('./routers/expense.router');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello, This is main page');
  });

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
