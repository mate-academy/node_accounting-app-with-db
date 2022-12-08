'use strict';

const express = require('express');
const { InitUserRoutes } = require('./user.routes');
const { InitExpenseRoute } = require('./expense.routes');
const cors = require('cors');


function createServer() {

  const app = express();
  app.use(cors());

  const userRouter = express.Router();
  const expenseRouter = express.Router();

  InitUserRoutes(userRouter);
  InitExpenseRoute(expenseRouter);

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
