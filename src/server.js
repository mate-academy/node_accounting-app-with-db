'use strict';

const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', userRouter.router);
  app.use('/expenses', expensesRouter.router);

  return app;
}

createServer().listen(3000);
