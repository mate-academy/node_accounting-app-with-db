'use strict';

const express = require('express');
const cors = require('cors');
const { usersRouter } = require('./routes/usersRouter');
const { expensesRouter } = require('./routes/expensesRouter');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || 'Internal server error' });
  });

  return app;
};

module.exports = {
  createServer,
};
