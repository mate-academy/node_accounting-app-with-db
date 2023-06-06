'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const expensesRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on port http://localhost:3000');
  });

  return app;
}

createServer();
