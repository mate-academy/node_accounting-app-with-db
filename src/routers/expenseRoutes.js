'use strict';

const {
  getExpenses,
  postExpense,
  getExpense,
  removeExpense,
  updateOne,
} = require('../controllers/ExpensesControllers');

const express = require('express');
const router = express.Router();

router.get('/', getExpenses);
router.post('/', postExpense);
router.get('/:id', getExpense);
router.delete('/:id', removeExpense);
router.patch('/:id', updateOne);

module.exports = {
  router,
};
