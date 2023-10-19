'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/usersRouter');
const { expensesRouter } = require('./routes/expensesRouter');

async function createServer() {
  const server = express();

  server.use(cors());
  server.use('/users', express.json(), usersRouter);
  server.use('/expenses', express.json(), expensesRouter);

  return server;
}

module.exports = {
  createServer,
};
