'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expenseController.getAll);

router.get('/:expenseId', expenseController.getOne);

router.post('/', expenseController.add);

router.patch('/:expenseId', expenseController.update);

router.delete('/:expenseId', expenseController.remove);

module.exports = { router };
