'use strict';

const express = require('express');
const router = express.Router();
const expensesController = require('./../controllers/expenses.controller');

router.get('/', expensesController.get);

router.post('/', express.json(), expensesController.add);

router.get('/:id', expensesController.getOne);

router.delete('/:id', expensesController.remove);

router.patch('/:id', express.json(), expensesController.update);

module.exports = router;
