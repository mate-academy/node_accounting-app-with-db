const express = require('express');
const {
  createExpenseController,
} = require('../controllers/expensesController.js');

const expenseRouter = () => {
  const expenseController = createExpenseController();
  const router = express.Router();

  router
    .route('/expenses')
    .get(expenseController.getExpense)
    .post(expenseController.postExpense);

  router
    .route('/expenses/:id')
    .get(expenseController.getOneExpense)
    .patch(expenseController.updateExpense)
    .delete(expenseController.deleteExpense);

  return router;
};

module.exports = expenseRouter;
