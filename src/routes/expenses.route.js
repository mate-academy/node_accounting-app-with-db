const express = require('express');
const expensesController = require('../controllers/expenses.controller.js');

const router = express.Router();

router.get('/', expensesController.get);
router.get('/:id', express.json(), expensesController.getOne);
router.post('/', express.json(), expensesController.create);
router.patch('/:id', express.json(), expensesController.update);
router.delete('/:id', expensesController.remove);

module.exports = { router };
