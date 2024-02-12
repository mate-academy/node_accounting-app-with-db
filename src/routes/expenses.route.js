'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const router = express.Router();

module.exports = {
  router,
};

router.get('/', expensesController.get);
router.get('/:id', expensesController.getById);

router.post('/', expensesController.create);

router.delete('/:id', expensesController.remove);

router.patch('/:id', expensesController.update);
