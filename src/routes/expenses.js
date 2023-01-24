'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');
const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:expenseId', expenseController.getOne);
router.post('/', expenseController.add);
router.delete('/:expenseId', expenseController.remove);
router.patch('/:expenseId', expenseController.update);

module.exports = {
  router,
};
