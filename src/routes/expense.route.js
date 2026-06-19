const expenseController = require('../controllers/expense.controller.js');
const express = require('express');
const router = express.Router();

router
  .get('/', expenseController.get)
  .get('/:id', expenseController.getOne)
  .post('/', expenseController.create)
  .delete('/:id', expenseController.remove)
  .patch('/:id', expenseController.update);

module.exports = router;
