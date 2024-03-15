'use strict';

const express = require('express');
const router = require('./routes');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use('/', router);

  return app;
}

module.exports = {
  createServer,
};
