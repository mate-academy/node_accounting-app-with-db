import 'dotenv/config';
import express, { json } from 'express';
import createError from 'http-errors';
import cors from 'cors';
import { router as expensesRouter } from './routes/expenses.router.js';
import { router as usersRouter } from './routes/users.router.js';
import { router as categoriesRouter } from './routes/categories.router.js';

const createServer = async() => {
  const app = express();

  app.use(cors());
  app.use(json());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);
  app.use('/categories', categoriesRouter);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    const { status = 500, message = 'Internal Server Error' } = err;

    res.status(status).send(message);
  });

  return app;
};

export { createServer };
