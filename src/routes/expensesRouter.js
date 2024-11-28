const express = require('express');
const expensesController = require('../controllers/expensesController');
const { errorHandler } = require('../middleware/errorHandler');
const router = express.Router();

router
  .route('/')
  .get(errorHandler(expensesController.getAll))
  .post(errorHandler(expensesController.create));

router
  .route('/:id')
  .get(errorHandler(expensesController.getOne))
  .patch(errorHandler(expensesController.update))
  .delete(errorHandler(expensesController.remove));

module.exports = {
  router,
};
