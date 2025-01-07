'use strict';

const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/usersRoute.js');
const { expensesRouter } = require('./routes/expensesRoute.js');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const createServer = () => {
  const app = express();

  const options = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE , PATCH',
    allowedHeaders: 'Content-Type',
    credentials: true,
  };

  app.use(cors(options), express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expensesRouter);

  app.use(errorMiddleware);

  return app;
};

module.exports = {
  createServer,
};
