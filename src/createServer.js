'use strict';

const express = require('express');
const cors = require('cors');

const expenseRouter = require('./routes/expense');
const userRouter = require('./routes/users');

function createServer() {
  const app = express();

  app.use(cors(), express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

createServer().listen(3003, () => {
  // eslint-disable-next-line no-console
  console.log('Server is started');
});
