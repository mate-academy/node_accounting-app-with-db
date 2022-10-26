'use strict';

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses');

router.post('/', expenseController.add);

router.get('/', expenseController.getAll);

router.get('/:expenseId', expenseController.getOne);

router.patch('/:expenseId', expenseController.update);

router.delete('/:expenseId', expenseController.remove);

module.exports = router;
