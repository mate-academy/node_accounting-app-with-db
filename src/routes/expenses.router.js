const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAllExpenses);

expensesRouter.get('/:id', expensesController.getExpenseById);

expensesRouter.post('/', expensesController.createExpense);

expensesRouter.delete('/:id', expensesController.deleteById);

expensesRouter.patch('/:id', expensesController.updateById);

module.exports = {
  expensesRouter,
};
