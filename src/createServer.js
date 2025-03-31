'use strict';

const express = require('express');
const usersRouter = require('./users/router');
const expensesRouter = require('./expenses/router');

const createServer = () => {
  const server = express();

  server.get('/', (req, res) => res.send('hello node'));

  server.use('/', usersRouter);

  server.use('/', expensesRouter);

  return server;
};

module.exports = {
  createServer,
};
