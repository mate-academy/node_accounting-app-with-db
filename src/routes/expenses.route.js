const express = require('express');
const expensesController = require('../controllers/expenses.controller.js');
const router = express.Router();

router.get('/', expensesController.get);

router.get('/:id', expensesController.getOne);

router.post('/', expensesController.create);

router.delete('/:id', expensesController.remove);

router.patch('/:id', expensesController.update);

module.exports = router;
