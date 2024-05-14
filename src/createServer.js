'use strict';

const express = require('express');
const cors = require('cors');

const { router: userRouter } = require('./routes/user.route');
const { router: expensesRouter } = require('./routes/expense.route');

function createServer() {
  const server = express();

  server.use(cors());
  server.use('/users', express.json(), userRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
