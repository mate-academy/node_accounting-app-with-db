const { Router } = require('express');
const expenseController = require('../controllers/expenseController');

const router = Router();

router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getOne);
router.post('/', expenseController.create);
router.patch('/:id', expenseController.update);
router.delete('/:id', expenseController.remove);

module.exports.expenseRouter = router;
