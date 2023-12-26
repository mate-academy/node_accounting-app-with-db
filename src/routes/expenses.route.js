'use strict';

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenses.controller');

router.get('/', expenseController.get);

router.get('/:id', expenseController.getOne);

router.delete('/:id', expenseController.remove);

router.post('/', express.json(), expenseController.add);

router.patch('/:id', express.json(), expenseController.update);

module.exports = router;
