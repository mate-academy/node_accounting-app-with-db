import * as expensesControllers from '../controllers/expenses.js';
import express from 'express';

export const router = express.Router();

router.get('/', expensesControllers.getAll)
  .get('/:expenseId', expensesControllers.getById)
  .post('/', express.json(), expensesControllers.create)
  .delete('/:expenseId', expensesControllers.remove)
  .put('/:expenseId', express.json(), expensesControllers.update);
