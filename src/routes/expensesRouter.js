const { Router } = require('express');
const {
  getAllExpenses,
  getExpense,
  createExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expensesController');

const expensesRouter = Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.post('/', createExpense);
expensesRouter.get('/:id', getExpense);
expensesRouter.delete('/:id', deleteExpense);
expensesRouter.patch('/:id', updateExpense);

module.exports = {
  expensesRouter,
};
