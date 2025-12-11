/* eslint-disable no-console */
'use strict';

const express = require('express');
const { sequelize } = require('./models/models');
const { userRouter } = require('./routers/user.router');
const { categoryRouter } = require('./routers/category.router');
const { expenseRouter } = require('./routers/expense.router');
const createServer = () => {
  // your code goes here
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.sendStatus(200);
  });

  app.use('/users', userRouter);
  app.use('/category', categoryRouter);
  app.use('/expenses', expenseRouter);
};

sequelize
  .sync({ alter: true })
  .then(() => {
    console.info('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Database sync failed:', err);
  });

module.exports = {
  createServer,
};
