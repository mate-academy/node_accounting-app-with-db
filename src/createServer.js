'use strict';

const { usersRoutes } = require('./routes/usersRoutes');
const { expensesRoutes } = require('./routes/expensesRoutes');

const createServer = () => {
  const express = require('express');
  const server = express();

  server.use(express.json());
  server.use('/users', usersRoutes);
  server.use('/expenses', expensesRoutes);

  return server;
};

module.exports = {
  createServer,
};
