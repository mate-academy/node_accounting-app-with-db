import * as expensesController from '../controllers/expensesController.js';
import express from 'express';

export const router = express.Router();

router.get('/', expensesController.getExpenses);

router.get('/:expenseId', expensesController.getExpense);

router.post('/', expensesController.createExpense);

router.delete('/:expenseId', expensesController.removeExpense);

router.patch('/:expenseId', expensesController.updateExpence);
