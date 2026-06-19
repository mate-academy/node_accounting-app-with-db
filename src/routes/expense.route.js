const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expense.controller.js');

router.get('/', expensesController.get);

router.post('/', expensesController.create);

router.get('/:id', expensesController.getOne);

router.delete('/:id', expensesController.remove);

router.patch('/:id', expensesController.update);

module.exports = { router };
