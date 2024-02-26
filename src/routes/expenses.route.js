'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const router = express.Router();

router.get('/', expensesController.get);

router.post('/', expensesController.create);

router.get('/:id', expensesController.getOne);

router.delete('/:id', expensesController.remove);

router.patch('/:id', expensesController.update);

module.exports = {
  expensesRouter: router,
};
