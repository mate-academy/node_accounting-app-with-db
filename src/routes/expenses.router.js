const { Router } = require('express');
const expensesRouter = Router();
const expensesController = require('../controllers/expenses.controller');

expensesRouter.get('/', expensesController.getAllExpenses);

expensesRouter.get('/:id', expensesController.getExpenseById);

expensesRouter.post('/', expensesController.createExpense);

expensesRouter.delete('/:id', expensesController.deleteById);

expensesRouter.patch('/:id', expensesController.updateById);

module.exports = {
  expensesRouter,
};
