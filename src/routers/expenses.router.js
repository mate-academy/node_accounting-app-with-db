const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getExpense);
expensesRouter.delete('/:id', expensesController.removeExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = { expensesRouter };
