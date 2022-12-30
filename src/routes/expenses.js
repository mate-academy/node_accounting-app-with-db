'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getOne);
router.post('/', expenseController.add);
router.delete('/:id', expenseController.remove);
router.patch('/:id', expenseController.update);

module.exports = {
  router,
};
