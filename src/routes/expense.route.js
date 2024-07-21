const express = require('express');
const router = express.Router();
const ExpensesControl = require('../controllers/expense.controller');
const { ROUTES } = require('../routes');

router.get(ROUTES.EXPENSES, ExpensesControl.getExpenses);
router.post(ROUTES.EXPENSES, ExpensesControl.addExpense);
router.get(ROUTES.EXPENSE_ID, ExpensesControl.getExpense);
router.delete(ROUTES.EXPENSE_ID, ExpensesControl.deleteExpense);
router.patch(ROUTES.EXPENSE_ID, ExpensesControl.updateExpense);

module.exports = router;
