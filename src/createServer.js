/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');
const { expensesRouter } = require('./routes/expenses.js');
const { usersRouter } = require('./routes/users.js');
const { categoriesRouter } = require('./routes/categories.js');
const Expense = require('./models/expenses.js');
const User = require('./models/users.js');
const Category = require('./models/categories.js');

function createServer() {
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

  app.use(cors());
  app.use(express.json());
  app.use('/expenses', expensesRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter);

  return app;
}

module.exports = createServer;
