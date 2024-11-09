const { userRouter } = require('./routers/user.router.js');
const { expenseRoute } = require('./routers/expense.router.js');
const { categoryRouter } = require('./routers/category.router.js');

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/users', userRouter);
  app.use('/expenses', expenseRoute);
  app.use('/categories', categoryRouter);

  return app;
}

module.exports = {
  createServer,
};
