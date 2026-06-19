'use strict';

const { router: usersRouter } = require('./routes/users.route');
const { router: expensesRouter } = require('./routes/expenses.route');

const cors = require('cors');
const express = require('express');
const { sequelizeSync } = require('./config/sequelize.sync');

const createServer = () => {
  const app = express();

  sequelizeSync();

  app.use(cors());
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
};

module.exports = {
  createServer,
};
