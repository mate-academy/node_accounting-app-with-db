'use strict';

const express = require('express');

const router = express.Router();

const expensesController = require('../controllers/expenses');

router.get('/', expensesController.getAll);
router.get('/:expensesId', expensesController.getOne);
router.post('/', express.json(), expensesController.addNew);
router.delete('/:expensesId', expensesController.remove);
router.patch('/:expensesId', express.json(), expensesController.change);

module.exports.router = router;
