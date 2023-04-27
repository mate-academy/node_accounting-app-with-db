'use strict';

const express = require('express');
const expenseControllers = require('../controllers/expenses');

const router = express.Router();

router.get('/', expenseControllers.getAll);

router.get('/:id', expenseControllers.getOne);

router.post('/', expenseControllers.add);

router.put('/:id', expenseControllers.update);

router.delete('/:id', expenseControllers.remove);

module.exports = router;
