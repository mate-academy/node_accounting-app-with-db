const { Router } = require('express');
const { expenseController } = require('../controllers');

const expenseRouter = Router();

expenseRouter.post('/', expenseController.create);
expenseRouter.get('/', expenseController.getAll);
expenseRouter.get('/:id', expenseController.getById);
expenseRouter.delete('/:id', expenseController.remove);
expenseRouter.patch('/:id', expenseController.patch);

module.exports = expenseRouter;
