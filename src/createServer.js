'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const { router: userRouter } = require('./routes/user.route');
const { router: expenseRouter } = require('./routes/expense.route');

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
