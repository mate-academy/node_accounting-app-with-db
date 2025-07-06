const { Router } = require('express');
const expenseController = require('../Controllers/expenseController');

const expensesRouter = Router();

expensesRouter.get('/', expenseController.getMany);
expensesRouter.post('/', expenseController.create);
expensesRouter.get('/:id', expenseController.getById);
expensesRouter.delete('/:id', expenseController.delete);
expensesRouter.patch('/:id', expenseController.update);

module.exports = expensesRouter;
