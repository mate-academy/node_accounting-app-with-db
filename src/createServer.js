'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./users/users.router');
const { expensesRouter } = require('./expenses/expenses.router');

require('dotenv').config();

function createServer() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
