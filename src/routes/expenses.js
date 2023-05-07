'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseController.getAll);
router.post('/', expenseController.add);
router.get('/:expenseId', expenseController.getOne);
router.delete('/:expenseId', expenseController.remove);
router.patch('/:expenseId', expenseController.update);

module.exports = router;
