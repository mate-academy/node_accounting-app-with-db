const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/controllerExpense');

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getById);
router.post('/', expenseController.create);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.remove);

module.exports = router;
