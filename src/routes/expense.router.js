'use strict';

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.get('/', expenseController.getAll);

router.get('/:id', expenseController.getOne);

router.post('/', expenseController.add);

router.delete('/:id', expenseController.remove);

router.patch('/:id', expenseController.update);

module.exports = {
  router,
};
