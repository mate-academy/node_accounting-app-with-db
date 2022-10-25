'use strict';

const { initUserRouter } = require('./routes/users');
const { initExpenseRouter } = require('./routes/expenses');

function initServer() {
  const { userRouter, userController } = initUserRouter();
  const { expenseRouter } = initExpenseRouter(userController);

  return {
    userRouter,
    expenseRouter,
  };
}

module.exports = { initServer };
