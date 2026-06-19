'use strict';

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/users', userRoutes);
  app.use('/expenses', expenseRoutes);

  // // Optional: 404 handler
  // app.use((req, res) => {
  //   res.status(404).json({ message: 'Route not found' });
  // });

  // // Optional: error handler
  // // eslint-disable-next-line no-console
  // app.use((err, req, res, next) => {
  //   console.error(err.stack);
  //   res.status(500).json({ message: 'Internal server error' });
  // });

  return app;
};

module.exports = { createServer };
