'use strict';

const express = require('express');
const userRouter = require('./routes/usersRouter');
const expenseRouter = require('./routes/expensesRouter');
const { sequelize } = require('./db');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);
  sequelize.sync();

  return app;
}

module.exports = {
  createServer,
};
