const express = require('express');
const { expensesController } = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.create);
expensesRouter.get('/:expenseId', expensesController.getOne);
expensesRouter.delete('/:expenseId', expensesController.deleteOne);
expensesRouter.patch('/:expenseId', expensesController.update);

module.exports = {
  expensesRouter,
};
