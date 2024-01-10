'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expenses.controller.js');
const { catchError } = require('../utils/catchError.js');

const router = express.Router();

router.get('/', catchError(expensesController.get));

router.get('/:id', catchError(expensesController.getOne));

router.post('/', catchError(expensesController.create));

router.delete('/:id', catchError(expensesController.remove));

router.patch('/:id', catchError(expensesController.update));

module.exports = {
  router,
};
