'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', express.json(), expensesController.getMany);

router.post('/', express.json(), expensesController.add);

router.get('/:expensesId', expensesController.getOne);

router.delete('/:expensesId', expensesController.remove);

router.patch('/:expensesId', express.json(), expensesController.update);

module.exports = { router };
