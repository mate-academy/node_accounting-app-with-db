const express = require('express');
const controller = require('../controllers/expenses.controller.js');

const router = express.Router();

router.get('/', (req, res) => {
  controller.getAllExpenses(req, res);
});

router.get('/:id', controller.getExpenseById);

router.post('/', controller.create);

router.delete('/:id', controller.remove);

router.patch('/:id', controller.update);

module.exports = router;
