import { Router } from 'express';
import * as expensesController from './expenses.controller.js';

const router = Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getById);
router.delete('/:id', expensesController.remove);
router.post('/', expensesController.create);
router.patch('/:id', expensesController.update);

export const expensesRouter = router;
