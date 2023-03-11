'use strict';

const expensesController = require('../controllers/expenses');
const express = require('express');
const { catchError } = require('../utils/catchError');

const router = express.Router();

router.get('/', catchError(expensesController.getAll));
router.get('/:id', catchError(expensesController.getById));
router.post('/', express.json(), catchError(expensesController.add));
router.delete('/:id', catchError(expensesController.remove));
router.patch('/:id', express.json(), catchError(expensesController.update));

module.exports = router;
