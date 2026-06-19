'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

function createServer() {
  const app = express();

  /* CORS  */
  const options = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE , PATCH',
    allowedHeaders: 'Content-Type',
    credentials: true,
  };

  app.use(cors(options), express.json());

  /* ROUTES */
  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  app.use(errorMiddleware);

  return app;
}

module.exports = {
  createServer,
};
