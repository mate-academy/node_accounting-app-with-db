'use strict'

const { Router } = require('express');
const expensesControllers = require('../controllers/expenses');

const router = Router();

router.get('/', expensesControllers.getAll);
router.get('/:id', expensesControllers.getById);

router.post('/', expensesControllers.create);

router.delete('/:id', expensesControllers.remove);

router.patch('/:id', expensesControllers.update);

module.exports = { router };
