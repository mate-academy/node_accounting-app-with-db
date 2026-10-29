const Router = require('express');
const { expenseController } = require('../controllers/expense.controller');

const expenseRouter = Router();

expenseRouter.get('/', expenseController.getAll);
expenseRouter.get('/:id', expenseController.getById);
expenseRouter.post('/', expenseController.create);
expenseRouter.patch('/:id', expenseController.update);
expenseRouter.delete('/:id', expenseController.deleteOne);

module.exports = {
  expenseRouter,
};
