'use strict';

const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenses');

router.post('/expenses', express.json(), expenseController.create);

router.get('/expenses', expenseController.getAll);

router.get('/expenses/:expenseId', expenseController.findById);

router.patch('/expenses/:expenseId', express.json(), expenseController.change);

router.delete('/expenses/:expenseId', expenseController.remove);

module.exports.expenseRouter = router;
