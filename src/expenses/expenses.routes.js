'use strict';

const express = require('express');
const expenseController = require('./expenses.controller');

const router = express.Router();

router.get('/', expenseController.getAll);

router.get('/:id', expenseController.getById);

router.post('/', expenseController.create);

router.delete('/:id', expenseController.remove);

router.patch('/:id', expenseController.update);

module.exports = {
  router,
};
