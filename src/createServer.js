/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routes/expenses');
const { userRouter } = require('./routes/user');
const { categoriesRouter } = require('./routes/categories');
const User = require('./models/user');
const Expense = require('./models/expenses');
const Category = require('./models/categories');

const createServer = () => {
  const app = express();

  User.sync()
    .then(() => {
      console.log('success');
    })
    .catch((error) => {
      console.log(error.message);
    });

  Expense.sync()
    .then(() => {
      console.log('success');
    })
    .catch((error) => {
      console.log(error.message);
    });

  Category.sync()
    .then(() => {
      console.log('success');
    })
    .catch((error) => {
      console.log(error.message);
    });

  app.use('/expenses', expensesRouter);
  app.use('/users', userRouter);
  app.use('/categories', categoriesRouter);
  app.use(cors());
  app.use(express.json());

  return app;
};

module.exports = createServer;
