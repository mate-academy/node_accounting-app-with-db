const { Router } = require('express');
const { expensesController } = require('../controllers/expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:id', expensesController.getById);
expensesRouter.post('/', expensesController.create);
expensesRouter.delete('/:id', expensesController.remove);
expensesRouter.patch('/:id', expensesController.update);

module.exports = expensesRouter;
