'use strict';

const express = require('express');
const cors = require('cors');
const { router: usersRouter } = require('./routers/users');
const { router: expensesRouter } = require('./routers/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.listen(5000);

  return app;
}

createServer();
