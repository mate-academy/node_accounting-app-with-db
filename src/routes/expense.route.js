const express = require('express');
const expensesController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expensesController.get);

router.get('/:id', expensesController.getOne);

router.post('/', expensesController.create);

router.patch('/:id', expensesController.update);

router.delete('/:id', expensesController.remove);

module.exports = {
  router,
};
