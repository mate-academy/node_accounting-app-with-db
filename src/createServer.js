const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const expenseRouter = require('./routes/expense.route');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
