'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const { router: userRouter } = require('./routes/usersRouter');
const { router: expenseRouter } = require('./routes/expensesRouter');

const createServer = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
};

module.exports = {
  createServer,
};
