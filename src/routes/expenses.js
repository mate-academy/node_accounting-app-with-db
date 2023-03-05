'use strict';

const expensesController = require('../controllers/expenses');
const express = require('express');

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getById);
router.post('/', express.json(), expensesController.add);
router.delete('/:id', expensesController.remove);
router.patch('/:id', express.json(), expensesController.update);

module.exports = router;
