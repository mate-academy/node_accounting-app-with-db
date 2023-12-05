import express from 'express';
import * as expenseController from '../controllers/expense.controller.js';

export const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getExpences);

expenseRouter.get('/:id', expenseController.getOne);

expenseRouter.post('/', expenseController.create);

expenseRouter.patch('/:id', expenseController.update);

expenseRouter.delete('/:id', expenseController.remove);
