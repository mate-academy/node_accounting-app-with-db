const express = require('express');
const expenseController = require('./../controllers/expense.controller');

const router = express.Router();

router
  .get('/', expenseController.get)
  .get('/:id', expenseController.getOne)
  .post('/', expenseController.post)
  .delete('/:id', expenseController.remove)
  .patch('/:id', expenseController.patch);

module.exports = router;
