'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const usersRouter = require('./components/routes/users.routes');
const expensesRouter = require('./components/routes/expenses.routes');

function createServer() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Home');
  });

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
