'use strict';

const express = require('express');
const cors = require('cors');

const userRouter = require('./router/users.router');
const expensesRouter = require('./router/expenses.router');
const categoriesRouter = require('./router/categories.router');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).send('Server is running');
  });

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  return app;
};

module.exports = {
  createServer,
};
