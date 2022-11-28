'use strict';

const { expences } = require('./routes/expenses');
const { users } = require('./routes/users');
const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  expences(app);
  users(app);

  return app;
}

module.exports = {
  createServer,
};
