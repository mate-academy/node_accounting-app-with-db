import express from 'express';
import * as expensesController from '../contollers/expenses.controller.js';

const router = express.Router();

router.get('/', expensesController.get);

router.get('/:id', expensesController.getOne);

router.post('/', expensesController.create);

router.delete('/:id', expensesController.remove);

router.patch('/:id', expensesController.update);

export default router;
