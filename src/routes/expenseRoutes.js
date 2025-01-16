const express = require('express');
const router = express.Router();
const expenseController = require('../сontrollers/expenseController');

router.get('/', express.json(), expenseController.getAllExpensesHandler);

router.post('/', express.json(), expenseController.createExpenseHandler);

router.get('/:id', expenseController.getExpenseByIdHandler);

router.delete('/:id', expenseController.deleteExpenseHandler);

router.patch('/:id', express.json(), expenseController.updateExpenseHandler);

module.exports = router;
