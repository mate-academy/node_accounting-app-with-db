const express = require('express');
const expenseControler = require('../controlers/expenses.controler');

const router = express.Router();

router.get('/', expenseControler.getAll);

router.get('/:id', expenseControler.getOne);

router.post('/', expenseControler.add);

router.delete('/:id', expenseControler.remove);

router.patch('/:id', expenseControler.update);

module.exports = router;
