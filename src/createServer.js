/* eslint-disable no-console */
'use strict';

const express = require('express');
const userRoutes = require('./routes/user.routes');
const expensesRoutes = require('./routes/expenses.routes');
const { expenses } = require('./data/expenses.js');
const { users } = require('./data/users.js');
const sequelize = require('./services/database.service.js');

async function connect () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connect();
sequelize.sync();

const createServer = () => {
  const app = express();

  expenses.length = 0;
  users.length = 0;

  app.use(express.json());

  app.use('/users', userRoutes);
  app.use('/expenses', expensesRoutes);

  return app;
};

module.exports = { createServer };
