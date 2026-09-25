const express = require('express');

const { expensesController } = require('../controllers/expense.controller');

const expensesRouter = express.Router();

// expensesRouter.get('/', expensesController.getByUserId);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.create);
expensesRouter.patch('/:id', expensesController.update);
expensesRouter.delete('/:id', expensesController.removeExpense);
// expensesRouter.put('/:id', expensesController.getAll);

module.exports = {
  expensesRouter,
};
