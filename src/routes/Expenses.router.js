'use strict';

const express = require('express');
const expensesController = require('../controllers/Expenses.controller');
const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getById);
router.post('/', expensesController.create);
router.patch('/:id', expensesController.update);
router.delete('/:id', expensesController.remove);

module.exports = { expensesRouter: router };
