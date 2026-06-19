const express = require('express');
const expensesController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expensesController.get);
router.post('/', expensesController.create);
router.get('/:id', expensesController.getOne);
router.patch('/:id', expensesController.update);
router.delete('/:id', expensesController.remove);

module.exports = {
  router,
};
