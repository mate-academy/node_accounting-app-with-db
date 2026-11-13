const express = require('express');
const expenseController = require('../controllers/expenses.controller');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    res.sendStatus(400);

    return;
  }

  req.params.id = numericId;
  next();
});

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getExpense);

router.post('/', expenseController.add);

router.patch('/:id', expenseController.update);

router.delete('/:id', expenseController.remove);

module.exports = router;
