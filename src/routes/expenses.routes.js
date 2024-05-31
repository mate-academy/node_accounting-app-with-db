const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenses.controller');

router.get('/', expensesController.getAll);

router.get('/:id', expensesController.getOne);

router.post('/', expensesController.create);

router.patch('/:id', expensesController.update);

router.delete('/:id', expensesController.remove);

module.exports = { expensesRouterApp: router };
