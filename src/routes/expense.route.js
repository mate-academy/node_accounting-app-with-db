const express = require('express');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getOne);
router.patch('/:id', express.json(), expenseController.update);
router.delete('/:id', expenseController.remove);
router.post('/', express.json(), expenseController.create);

module.exports = router;
