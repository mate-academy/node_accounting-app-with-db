'use strict';

import express from 'express';
import * as expensesControllers from './controllers-expenses.js';

export const expenseRouter = express.Router();

expenseRouter.get('/expenses', expensesControllers.getAll);

expenseRouter.get('/expenses/:expenseId', expensesControllers.getExpense);

expenseRouter.post('/expenses', expensesControllers.createExpense);

expenseRouter
  .delete('/expenses/:expenseId', expensesControllers.deleteExpense);

expenseRouter
  .patch('/expenses/:expenseId', expensesControllers.updateExpense);

