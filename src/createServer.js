'use strict';

const express = require('express');
const routes = require('./routes/index.routes');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(routes);

  app.locals.users = [];
  app.locals.nextUserId = 1;

  return app;
};

module.exports = {
  createServer,
};
