'use strict';

const express = require('express');
const { initServer } = require('./initServer');

function createServer() {
  const {
    userRouter,
    expenseRouter,
  } = initServer();

  const app = express();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
