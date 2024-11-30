const { Router } = require('express');
const { expensesController } = require('./../controllers');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.create);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.delete('/:id', expensesController.deleteOne);
expensesRouter.patch('/:id', expensesController.update);

module.exports = expensesRouter;
