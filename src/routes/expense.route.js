const express = require('express');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseController.get);
router.get('/:id', expenseController.getById);
router.post('/', express.json(), expenseController.create);
router.delete('/:id', expenseController.remove);
router.patch('/:id', express.json(), expenseController.update);

module.exports = {
  router,
};
