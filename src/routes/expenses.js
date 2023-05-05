'use strict';

const express = require('express');

const router = express.Router();

const { controller: expenseController } = require('../controllers/expenses');

router.get('/', expenseController.getAll);

router.post('/', expenseController.add);

router.get('/:expenseId', expenseController.getOne);

router.delete('/:expenseId', expenseController.remove);

router.patch('/:expenseId', expenseController.update);

module.exports.router = router;
