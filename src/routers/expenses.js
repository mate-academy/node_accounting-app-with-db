'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getOne);
router.post('/', expensesController.add);
router.patch('/:id', expensesController.update);
router.delete('/:id', expensesController.remove);

module.exports = { router };
