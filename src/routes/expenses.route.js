const { Router } = require('express');
const expenses = require('../controllers/expenses.controller');

const router = Router();

router.get('/', expenses.getAll);

router.get('/:id', expenses.getById);

router.post('/', expenses.create);

router.delete('/:id', expenses.deleteById);

router.patch('/:id', expenses.update);

module.exports = router;
