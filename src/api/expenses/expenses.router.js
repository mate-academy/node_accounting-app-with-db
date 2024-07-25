const { Router } = require('express');
const { expensesController } = require('./expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.post('/', expensesController.create);

expensesRouter.get('/:id', expensesController.getById);

expensesRouter.delete('/:id', expensesController.remove);

expensesRouter.patch('/:id', expensesController.update);

module.exports = {
  expensesRouter,
};
