'use strict';

const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/usersRoutes');
const expensesRouter = require('./routes/expensesRoutes');

function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), usersRouter);
  app.use('/expenes', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
