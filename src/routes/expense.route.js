const express = require('express');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.post('/', expenseController.create);
router.get('/', expenseController.getAll);
router.get('/:id', expenseController.get);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.remove);

module.exports = {
  router,
};
