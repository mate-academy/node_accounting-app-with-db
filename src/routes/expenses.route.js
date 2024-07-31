const router = require('express').Router();
const expenseController = require('../controllers/expenses.controller');

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getOne);
router.post('/', expenseController.create);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.remove);

module.exports = router;
