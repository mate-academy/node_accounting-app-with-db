'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controller');
const { validateAndParseId } = require('../middleware/validateAndParseId');

const router = express.Router();

router.get('/', expenseController.get);

router.get('/:id', validateAndParseId, expenseController.getOne);

router.post('/', expenseController.create);

router.delete('/:id', validateAndParseId, expenseController.remove);

router.patch('/:id', validateAndParseId, expenseController.update);

module.exports = { router };
