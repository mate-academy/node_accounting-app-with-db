import express, { json } from 'express';
import usersRouter from './models/user/user.router.js';
import { expensesRouter } from './models/expenses/expenses.router.js';

const app = express();

app.use('/users', json(), usersRouter);
app.use('/expenses', json(), expensesRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on localhost:3000');
});
