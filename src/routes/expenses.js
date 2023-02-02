'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.post('/', expensesController.create);

router.get('/', expensesController.getAll);

router.get('/:id', expensesController.getOne);

router.patch('/:id', expensesController.change);

router.delete('/:id', expensesController.remove);

module.exports = { router };
