const expensesController = require('../controllers/expenses.controller.js');

const express = require('express');
const router = express.Router();

router.get('/', expensesController.get);

router.get('/:id', expensesController.getOne);

router.post('/', expensesController.post);

router.delete('/:id', expensesController.remove);

router.patch('/:id', expensesController.patch);

module.exports = router;
