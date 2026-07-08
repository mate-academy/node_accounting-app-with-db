'use strict';

const accountingRouter = require('./accountingRouter.js');
const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  app.use(express.json());

  app.use('/', accountingRouter());

  return app;
}

module.exports = {
  createServer,
};
