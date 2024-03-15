'use strict';

const express = require('express');

const createServer = () => {
  const app = express();

  return app;
};

module.exports = {
  createServer,
};
