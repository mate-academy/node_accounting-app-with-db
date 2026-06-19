'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./router/users.router');
const { expensesRouter } = require('./router/expenses.router');
const { sequelize } = require('./db');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  sequelize.sync();

  return app;
}

module.exports = {
  createServer,
};
