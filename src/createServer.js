'use strict';

const express = require('express');
const { usersRouter } = require('./routers/users.router');
const cors = require('cors');
const { expensesRouter } = require('./routers/expenses.router');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { sequelize } = require('./db.js');
const createServer = () => {
  const syncDb = async () => {
    try {
      await sequelize.authenticate();
      await User.sync();
      await Expense.sync();
    } catch (error) {}
  };

  syncDb();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
