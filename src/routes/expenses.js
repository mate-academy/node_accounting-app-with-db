'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getByFilter);
router.get('/:id', expensesController.getById);
router.post('/', expensesController.create);
router.patch('/:id', expensesController.update);
router.delete('/:id', expensesController.remove);

module.exports = router;
