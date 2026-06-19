const router = require('express').Router();
const expenseController = require('../api/expenses.controller');

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.get);
router.post('/', expenseController.create);
router.delete('/:id', expenseController.remove);
router.patch('/:id', expenseController.update);

module.exports = {
  router,
};
