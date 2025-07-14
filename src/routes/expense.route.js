import * as expenseControl from '../controls/expense.control.js';
import express from 'express';

export const router = express.Router();

router.get('/', expenseControl.getExpenses);
router.get('/:id', expenseControl.getByIdExpenses);
router.delete('/:id', expenseControl.removeExpense);
router.post('/', expenseControl.addExpenses);
router.patch('/:id', expenseControl.patchExpenses);
