const { Router } = require('express');
const { expensesController } = require('../controllers');

const expensesRouter = Router();

expensesRouter.post('/', expensesController.create);
expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.delete('/:id', expensesController.remove);
expensesRouter.patch('/:id', expensesController.update);

exports.expensesRouter = expensesRouter;
