const express = require('express');
const expensesController = require('../controller/expenses.controller');

const router = express.Router();

router.get('/', expensesController.get);
router.post('/', express.json(), expensesController.create);
router.get('/:id', expensesController.getById);
router.delete('/:id', expensesController.remove);
router.patch('/:id', express.json(), expensesController.update);

module.exports = router;
