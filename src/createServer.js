'use strict';

const express = require('express');
const { User } = require('./db/models/User.model');
const { Expense } = require('./db/models/Expense.model');

const createServer = () => {
  const app = express();

  User.sync({ force: true, logging: false });
  Expense.sync({ force: true, logging: false });

  return app;
};

module.exports = {
  createServer,
};
