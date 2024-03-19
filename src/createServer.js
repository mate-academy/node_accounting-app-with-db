const cors = require('cors');
const express = require('express');
const { userRouter } = require('./routes/user.route');
const { expenseRouter } = require('./routes/expenses.route');
const app = express();

function createServer() {
  app.use(cors());

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  return app;
}

module.exports = {
  createServer,
};
