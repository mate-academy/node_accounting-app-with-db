const { Router } = require('express');
const expenseController = require('../controllers/expenseController');

const expenseRouter = Router();

expenseRouter.get('/', expenseController.getAll);
expenseRouter.post('/', expenseController.create);
expenseRouter.get('/:id', expenseController.getById);
expenseRouter.delete('/:id', expenseController.remove);
expenseRouter.patch('/:id', expenseController.update);

module.exports = {
  expenseRouter,
};
