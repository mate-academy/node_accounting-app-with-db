'use strict';

const express = require('express');
const { sequelize } = require('./db');
const categoriesRouter = require('./router/categories.router');

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/categories', categoriesRouter);

  return app;
};

module.exports = {
  createServer,
};
