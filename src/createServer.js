'use strict';

const express = require('express');
const { initUserRouter } = require('./routes/userRouter.js');
const { initExpenseRouter } = require('./routes/expenseRouter');

async function createServer() {
  const app = express();

  app.use(express.json());

  const userRouter = express.Router();
  const expenseRouter = express.Router();

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  initUserRouter(userRouter);
  initExpenseRouter(expenseRouter);

  app.listen(4555, () => {});

  return app;
}

createServer();

module.exports = {
  createServer,
};
