const { Router } = require('express');
const expensesController = require('../controllers/expenses.controller');

const expenseRouter = Router();

expenseRouter.get('/', expensesController.getExpenseByFilter);
expenseRouter.get('/:expenseId', expensesController.getExpenseById);
expenseRouter.post('/', expensesController.createExpense);
expenseRouter.patch('/:expenseId', expensesController.updateExpense);
expenseRouter.delete('/:expenseId', expensesController.deleteExpense);

module.exports = expenseRouter;
