'use strict';

const express = require('express');
const cors = require('cors');
const { createExpensesRouter } = require('./models/routers/expreseRouter');
const { createUserRouter } = require('./models/routers/userRouter');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/expenses', createExpensesRouter());
  app.use('/users', createUserRouter());

  return app;
}

module.exports = {
  createServer,
};
