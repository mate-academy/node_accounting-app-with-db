const express = require('express');
const expensesController = require('../controllers/expenses.controller');
const {
  createExpenseValidationRules,
  updateExpenseValidationRules,
  validateExpense,
} = require('../validators/expenseValidators');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res
      .status(400)
      .json({ error: 'Invalid ID. Must be a positive integer.' });
  }

  req.id = numericId;

  next();
});

router.get('/', expensesController.get);

router.post(
  '/',
  createExpenseValidationRules,
  validateExpense,
  expensesController.create,
);
router.get('/:id', expensesController.getOne);
router.delete('/:id', expensesController.remove);

router.patch(
  '/:id',
  updateExpenseValidationRules,
  validateExpense,
  expensesController.update,
);

module.exports = router;
