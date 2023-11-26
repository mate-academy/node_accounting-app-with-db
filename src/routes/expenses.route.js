'use strict';

const express = require('express');
const router = express.Router();

const exprenseController = require('../controllers/expenses.controller');

router.get('/:id', exprenseController.getById);
router.get('/', exprenseController.gerAllIncludesQuery);
router.post('/', exprenseController.createExpense);
router.delete('/:id', exprenseController.deleteParticular);
router.patch('/:id', exprenseController.updateParticular);

module.exports = {
  router,
};
