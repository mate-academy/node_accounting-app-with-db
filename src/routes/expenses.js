'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');
const router = express.Router();

router.get('/expenses', expenseController.getAll);

router.get('/expenses/:expenseId', expenseController.getOne);

router.post('/expenses', expenseController.add);

router.delete('/expenses/:expenseId', expenseController.remove);

router.patch('/expenses/:expenseId', expenseController.update);

module.exports = { expenseRouter: router };
