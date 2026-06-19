const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expensesController.get);
router.post('/', expensesController.create);
router.get('/:id', expensesController.getById);
router.delete('/:id', expensesController.removeExpenses);
router.patch('/:id', expensesController.update);

module.exports = router;
