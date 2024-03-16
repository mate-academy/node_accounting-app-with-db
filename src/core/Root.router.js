'use strict';

const { Router } = require('express');
const ExpenseRouter = require('../modules/Expense/Expense.router');
const UserRouter = require('../modules/User/User.router');

class RootRouter {
  #router = Router();
  constructor(rootProvider) {
    this.userRouter = new UserRouter(rootProvider.user.controller);
    this.expenseRouter = new ExpenseRouter(rootProvider.expense.controller);

    this.#router.use('/expenses', this.expenseRouter.router);
    this.#router.use('/users', this.userRouter.router);
  }

  getRouter() {
    return this.#router;
  }
}

module.exports = RootRouter;
