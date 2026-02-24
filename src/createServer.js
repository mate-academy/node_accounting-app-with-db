'use strict';

const express = require('express');
const cors = require('cors');

const routers = require('./routers');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', routers.userRouter);
  app.use('/expenses', routers.expenseRouter);
  app.use('/categories', routers.categoryRouter);

  return app;
};

module.exports = {
  createServer,
};
