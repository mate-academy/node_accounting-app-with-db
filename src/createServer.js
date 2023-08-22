import express from 'express';

import { router as usersRouter } from './routes/users.js';
import { router as expenseRouter } from './routes/expenses.js';

export function createServer() {
  const app = express();

  app.use('/users', usersRouter);
  app.use('/expenses', expenseRouter);

  return app;
}
