const expensesController = require('../controller/expenses.controller');
const express = require('express');
const router = express.Router();

router.get('/', expensesController.get);

router.get('/:id', expensesController.getOne);

router.post('/', expensesController.create);

router.delete('/:id', expensesController.remove);

router.patch('/:id', express.json(), expensesController.update);

module.exports = {
  router,
};
