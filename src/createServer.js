'use strict';

import express from 'express';
import usersRouter from './routes/users.route.js';
import expensesRouter from './routes/expenses.route.js';

const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/users', usersRouter);

  app.use('/expenses', expensesRouter);

  return app;
};

export { createServer };
