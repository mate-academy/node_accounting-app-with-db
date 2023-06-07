'use strict';

const express = require('express');
const cors = require('cors');

const { userRouter } = require('./routes/userRouter');
const { expenseRouter } = require('./routes/expenseRouter');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  app.listen(5000);

  return app;
}

createServer();
