'use strict';

const express = require('express');
const cors = require('cors');
const initRoutes = require('./routes/routes');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  initRoutes(app);

  return app;
}

module.exports = {
  createServer,
};
