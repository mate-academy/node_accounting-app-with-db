'use strict';

const cors = require('cors');
const express = require('express');
const userRouter = require('./routes/user.route.js');
const expensesRouter = require('./routes/expense.route.js');

const createServer = () => {
  const app = express();

  // app.use(cors());
  // app.use(express.json());

  /* app.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  }); */

  app.use('/users', express.json(), cors(), userRouter);
  app.use('/expenses', express.json(), cors(), expensesRouter);

  /* app.use((req, res) => {
    res.status(404).send('Not found');
  }); */

  return app;
};

module.exports = {
  createServer,
};
