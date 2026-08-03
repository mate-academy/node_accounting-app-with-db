'use strict';

const express = require('express');
const cors = require('cors');
const routes = require('./api/routes.js');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  for (const routeKey in routes) {
    app.use(`/${routeKey}`, routes[routeKey]);
  }

  return app;
};

module.exports = {
  createServer,
};
