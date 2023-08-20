import { Router } from 'express';
import * as expensesController from '../controllers/expenses.controller.js';

const router = Router();

router.get('/', expensesController.getAllExpenses);
router.get('/:expensesId', expensesController.getExpense);

router.post('/', expensesController.createExpense);
router.patch('/:expensesId', expensesController.updateExpense);
router.delete('/:expensesId', expensesController.deleteExpense);

export { router };
