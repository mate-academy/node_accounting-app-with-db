const express = require('express');
const { expensesController } = require('../controllers/expenses.controller.js');

const router = express.Router();

router.get('/', expensesController.getAll);

router.post('/', expensesController.create);

router.delete('/:id', expensesController.deleteOne);

router.get('/:id', expensesController.getOne);

router.put('/:id', expensesController.updatePut);

router.patch('/:id', expensesController.updatePatch);

module.exports = router;
