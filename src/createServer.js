'use strict';

const express = require('express');
const userRouter = require('./modules/User/User.router');

const createServer = () => {
  const app = express();

  app.use('/users', userRouter);

  return app;
};

module.exports = {
  createServer,
};
