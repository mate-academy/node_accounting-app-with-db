const { Router } = require('express');
const expensesController = require('../controllers/expensesController');

const router = Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getOne);
router.post('/', expensesController.create);
router.delete('/:id', expensesController.remove);
router.patch('/:id', expensesController.update);

module.exports = router;
