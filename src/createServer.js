'use strict';

const express = require('express');
const cors = require('cors');

const { router: userRouter } = require('./routes/userRoute.js');
const { router: expensesRouter } = require('./routes/expensesRoute.js');

async function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
