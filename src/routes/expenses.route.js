/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const expensesController = require('../controller/expenses.controller');

router.get('/', expensesController.getAll);

router.get('/:id', expensesController.getOne);

router.delete('/:id', expensesController.remove);

router.post('/', expensesController.create);

router.patch('/:id', expensesController.update);

module.exports = {
  router,
};
