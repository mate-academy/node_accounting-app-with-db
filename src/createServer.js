import express from 'express';
import cors from 'cors';

import { expenseRouter } from './routes/expense.route.js';
import { userRouter } from './routes/user.route.js';

export function createServer() {
  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expenseRouter);

  return app;
};
