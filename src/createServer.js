'use strict';

const express = require('express');
const cors = require('cors');
const { UserRouter } = require('./modules/User/User.router');

function createServer() {
  const app = express();

  app.use(cors());

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  app.use(express.json());
  app.use('/users', UserRouter);

  return app;
}

module.exports = {
  createServer,
};
