const express = require('express');
const expensesControllers = require('./../controllers/expense.controller');

const router = express.Router();

router.get('/', expensesControllers.get);

router.get('/:id', expensesControllers.getOne);

router.post('/', expensesControllers.create);

router.patch('/:id', expensesControllers.update);

router.delete('/:id', expensesControllers.remove);

module.exports = {
  router,
};
