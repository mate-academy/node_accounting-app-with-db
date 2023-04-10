'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const router = express.Router();

const hasParams = (req, _res, next) => {
  if (Object.keys(req.query).length > 0) {
    next();
  } else {
    next('route');
  }
};

router.get('/', hasParams, expenseController.getByParameters);
router.get('/', expenseController.getAll);
router.get('/:expenseId', expenseController.getOne);
router.post('/', expenseController.add);
router.delete('/:expenseId', expenseController.remove);
router.patch('/:expenseId', expenseController.update);

module.exports = { router };
