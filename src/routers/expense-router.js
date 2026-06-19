const { Router } = require('express');
const {
  createExpenseController,
  getAllExpensesController,
  getExpenseByIdController,
  updateExpenseController,
  deleteExpenseController,
} = require('../controllers/expense-controller');

const expenseRouter = Router();

expenseRouter
  .route('/expenses')
  .post(createExpenseController)
  .get(getAllExpensesController);

expenseRouter
  .route('/expenses/:id')
  .get(getExpenseByIdController)
  .patch(updateExpenseController)
  .delete(deleteExpenseController);

module.exports = { expenseRouter };
