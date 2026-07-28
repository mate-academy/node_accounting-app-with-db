'use strict';

const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users.router');
const expensesRouter = require('./routes/expenses.router');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.use((err, req, res, next) => {
    const status = err.status || 500;

    res.status(status).send({
      message: err.message || 'Internal Server Error',
    });
  });

  return app;
}

module.exports = { createServer };
