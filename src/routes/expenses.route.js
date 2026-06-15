const express = require('express');
const expensesController = require('../controllers/expenses.controller.js');

const router = express.Router();

router.get('/', expensesController.get);

router.post('/', expensesController.create);

router.get('/:id', expensesController.getOne);

router.patch('/:id', expensesController.update);

router.delete('/:id', expensesController.remove);

module.exports = router;
