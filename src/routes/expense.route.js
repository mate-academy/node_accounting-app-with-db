'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseController.getAll);

router.get('/:id', expenseController.getOne);

router.post('/', express.json(), expenseController.addOne);

router.delete('/:id', expenseController.deleteOne);

router.patch('/:id', express.json(), expenseController.updateOne);

module.exports = router;
