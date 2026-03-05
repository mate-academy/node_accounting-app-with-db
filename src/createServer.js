'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/users.router');
const { expensesRouter } = require('./routes/expenses.router');
const { categoriesRouter } = require('./routes/categories.router');

const createServer = () => {
  const { models } = require('./models/models');
  const { User, Category, Expense } = models;

  const app = express();

  User.sync();
  Category.sync();
  Expense.sync();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/categories', express.json(), categoriesRouter);
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
