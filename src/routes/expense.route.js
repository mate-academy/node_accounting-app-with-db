'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseController.getAll);

router.get('/:id', expenseController.getOne);

router.post('/', express.json(), expenseController.create);

router.patch('/:id', express.json(), expenseController.update);

router.delete('/:id', expenseController.remove);

module.exports = { router };
