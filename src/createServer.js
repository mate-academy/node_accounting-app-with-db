'use strict';

const { expences } = require('./routes/expenses');
const { users } = require('./routes/users');
const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  expences(app);
  users(app);

  return app;
}

createServer()
  .listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running');
  });
