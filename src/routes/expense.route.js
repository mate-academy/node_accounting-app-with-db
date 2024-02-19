'use strict';

const express = require('express');
const expensesContoller = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expensesContoller.getAll);

router.post('/', express.json(), expensesContoller.create);

router.get('/:id', expensesContoller.getOne);

router.delete('/:id', expensesContoller.remove);

router.patch('/:id', express.json(), expensesContoller.update);

module.exports = router;
