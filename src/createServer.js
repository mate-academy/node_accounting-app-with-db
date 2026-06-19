'use strict';

const express = require('express');
const { router: userRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expenses.route');
const { router: categoriesRouter } = require('./routes/categories.route');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/', (req, res) => {
    res.send('Hello it is main page');
  });

  app.use('/categories', categoriesRouter);
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
