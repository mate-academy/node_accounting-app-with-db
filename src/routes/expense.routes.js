'use stric';

const express = require('express');

const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseController.getAll);
router.post('/', expenseController.create);

module.exports = router;
