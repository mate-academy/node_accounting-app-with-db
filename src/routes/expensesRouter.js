const { Router } = require('express');
const expensesController = require('../controllers/expensesController');

const router = Router();

router
  .route('/')
  .get(expensesController.getExpenses)
  .post(expensesController.postExpense);

router
  .route('/:id')
  .get(expensesController.getExpenseById)
  .delete(expensesController.removeExpense)
  .patch(expensesController.udpateExpense);

module.exports = router;
