import express from 'express';
import cors from 'cors';

import { expenseRouter } from './routes/expense.route.js';
import { userRouter } from './routes/user.route.js';
import * as userService from './services/user.service.js';
import * as expenseService from './services/expense.service.js';

export function createServer() {
  userService.reset();
  expenseService.reset();

  const app = express();

  app.use(cors());

  app.use('/users', express.json(), userRouter);

  app.use('/expenses', express.json(), expenseRouter);

  return app;
};

// app.listen(5040, () => {
//   console.log('server is running locally on 5040');
// });
