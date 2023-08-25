'use strict';

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.get('/', expenseController.getAll);

router.get('/:expenseId', expenseController.getOne);

router.post('/', expenseController.add);

router.delete('/:expenseId', expenseController.remove);

router.patch('/:expenseId', expenseController.update);

module.exports = {
  router,
};
