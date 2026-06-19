/* eslint-disable no-console */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./db');

require('./models/models');

const { router: usersRouter } = require('./services/users.service.js');
const { router: expensesRouter } = require('./services/expenses.service.js');

const createServer = () => {
  const app = express();

  app.use(bodyParser.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.start = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to DB has been established successfully.');

      await sequelize.sync({ force: false });
      console.log('Database synchronized.');

      return app;
    } catch (error) {
      console.error('Unable to connect to the database or sync models:', error);
      process.exit(1);
    }
  };

  return app;
};

module.exports = {
  createServer,
};
