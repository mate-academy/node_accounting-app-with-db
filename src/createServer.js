/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');

require('express-async-errors');

const { User } = require('./models/User.model');
const { router: userRouter } = require('./routers/user.route');
const { router: expenseRouter } = require('./routers/expense.route');
const { Expense } = require('./models/Expense.model');

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!', message: err.message });
  });

  return app;
};

module.exports = {
  createServer,
};

beforeEach(async () => {
  await User.destroy({ where: {}, truncate: true });
  await Expense.destroy({ where: {}, truncate: true });
});
