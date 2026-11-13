const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller.js');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.post('/', expensesController.create);
expensesRouter.delete('/:id', expensesController.remove);
expensesRouter.patch('/:id', expensesController.update);
expensesRouter.put('/:id', expensesController.update);

module.exports = {
  expensesRouter,
};
