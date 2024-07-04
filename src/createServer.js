'use strict';

const express = require('express');
const morgan = require('morgan');
const { usersRouter } = require('./routes/users.routes');
const { expencesRouter } = require('./routes/expences.routes');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(morgan('tiny'));

  app.use('/users', usersRouter);
  app.use('/expenses', expencesRouter);

  app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use((error, _, res, __) => {
    const { status = 500, message = 'Server error' } = error;

    res.status(status).json({ message });
  });

  return app;
}

module.exports = {
  createServer,
};
