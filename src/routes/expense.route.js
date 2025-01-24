const expenseController = require('../controllers/expense.controller.js');
const express = require('express');
const router = express.Router();

router.get('/', expenseController.get);

router.get('/:id', expenseController.getById);

router.post('/', expenseController.create);

router.delete('/:id', expenseController.remove);

router.patch('/:id', expenseController.update);

module.exports = { router };
