const express = require('express');

const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router
  .route('/')
  .get(expenseController.getByFilter)
  .post(expenseController.create);

router
  .route('/:id')
  .get(expenseController.getOne)
  .patch(expenseController.update)
  .delete(expenseController.remove);

module.exports = router;
