const expensesController = require('../controllers/expenses.controller');

const express = require('express');

module.exports = function (users, expenses) {
  const router = express.Router();

  router.get('/', expensesController.get(expenses));

  router.get('/:id', expensesController.getOne(expenses));

  router.post('/', expensesController.create(users, expenses));

  router.patch('/:id', expensesController.update(users, expenses));

  router.delete('/:id', expensesController.remove(expenses));

  return router;
};
