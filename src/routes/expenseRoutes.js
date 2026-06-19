const { Router } = require('express');
const expenseController = require('../controllers/expenseController');

const expenseRouter = Router();

expenseRouter.get('/', expenseController.getAllController);
expenseRouter.get('/:id', expenseController.getByIdController);
expenseRouter.post('/', expenseController.createController);
expenseRouter.delete('/:id', expenseController.deleteOneController);
expenseRouter.patch('/:id', expenseController.updateController);

module.exports = { expenseRouter };
