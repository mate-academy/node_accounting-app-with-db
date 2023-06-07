'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/userRouter');
const { expenseRouter } = require('./routes/expenseRouter');

function createServer() {
  const server = express();

  server.use(cors());

  server.use(express.json());

  server.use('/users', userRouter);
  server.use('/expenses', expenseRouter);

  server.listen(5000);

  return server;
}

createServer();

module.exports = {
  createServer,
};
