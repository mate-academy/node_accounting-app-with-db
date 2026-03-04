'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.router');
const { expensesRouter } = require('./routes/expenses.router');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

const createServer = () => {
  const app = express();

  User.sync();
  Expense.sync();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  app.use((err, req, res, next) => {
    return res.status(500).json({
      message: err.message || 'Bad Request',
    });
  });

  return app;
};

module.exports = {
  createServer,
};
