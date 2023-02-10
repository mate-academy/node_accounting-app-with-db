'use strict';

const expensesController = require('../controllers/expenses');
const express = require('express');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expensesId', expensesController.getById);
router.post('/', express.json(), expensesController.add);
router.patch('/:expensesId', express.json(), expensesController.update);
router.delete('/:expensesId', expensesController.remove);

module.exports = { router };
