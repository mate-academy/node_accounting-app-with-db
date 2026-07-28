const express = require('express');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseController.getAll);
router.post('/', expenseController.create);

router.get('/:id', expenseController.getById);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.remove);

module.exports = router;
