'use strict';
import express from 'express';
import cors from 'cors';
import { router as expenseRouter } from './routes/expense.route.js';
import { router as userRouter } from './routes/user.route.js';

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

export { createServer };
