const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.post('/', expensesController.create);
expensesRouter.delete('/:id', expensesController.deleteOne);
expensesRouter.patch('/:id', expensesController.update);
expensesRouter.put('/:id', expensesController.update);

module.exports = {
  expensesRouter,
};
