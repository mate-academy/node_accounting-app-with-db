const express = require('express');
const expensesController = require('../controllers/expense.controller');
const { catchError } = require('../utils/catchError');

const router = express.Router();

router.get('/', catchError(expensesController.get));

router.get('/:id', catchError(expensesController.getOne));

router.post('/', catchError(expensesController.create));

router.patch('/:id', catchError(expensesController.update));

router.delete('/:id', catchError(expensesController.remove));

module.exports = {
  router,
};
