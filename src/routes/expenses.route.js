const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.post('/', expensesController.create);
expensesRouter.patch('/:id', expensesController.update);
expensesRouter.delete('/:id', expensesController.deleteOne);

module.exports = {
  expensesRouter,
};
