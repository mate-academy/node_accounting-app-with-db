'use strict';

const express = require('express');

const {
  getMany,
  getOne,
  addNew,
  remove,
  update,
} = require('../controllers/expenses');

const router = express.Router();

function createExpense(app) {
  app.use('/expenses', router);

  router.post('/', express.json(), addNew);

  router.get('/:expenseId', getOne);

  router.get('/', getMany);

  router.delete('/:expenseId', remove);

  router.patch('/:expenseId', express.json(), update);
}

module.exports = { createExpense };
