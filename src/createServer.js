'use strict';

const express = require('express');
const RootProvider = require('./core/Root.provider');
const RootRouter = require('./core/Root.router');

const createServer = () => {
  const app = express();
  const provider = new RootProvider();
  const router = new RootRouter(provider);

  app.use(router.getRouter());

  return app;
};

module.exports = {
  createServer,
};
