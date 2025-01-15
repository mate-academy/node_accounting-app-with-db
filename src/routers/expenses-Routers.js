const Router = require('express');

const expensesController = require('../controllers/expenses-Controllers');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.get('/:id', expensesController.getExpensById);
expensesRouter.delete('/:id', expensesController.deleteExpense);

expensesRouter.patch('/:id', expensesController.updateExpense);
expensesRouter.post('/', expensesController.createExpense);

module.exports = expensesRouter;
