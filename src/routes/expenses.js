import express from 'express';

import * as expenseController from '../controllers/expenses.js';

export const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:expenseId', expenseController.getOne);
router.post('/', express.json(), expenseController.add);
router.patch('/:expenseId', express.json(), expenseController.update);
router.delete('/:expenseId', expenseController.remove);
