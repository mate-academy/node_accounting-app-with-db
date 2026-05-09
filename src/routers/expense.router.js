const express = require('express');
const { expenseController } = require('../controllers/expense.controller');
const router = express.Router();

router.route('/').get(expenseController.getAll).post(expenseController.add);

router
  .route('/:id')
  .get(expenseController.getById)
  .patch(expenseController.update)
  .delete(expenseController.remove);

module.exports = router;
