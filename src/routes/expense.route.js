'use strict';

const express = require('express');
const expenseController = require('../controllers/expense.controller.js');
const {
  validateIdReqParam,
  validateReqParamsForGet,
  validateReqParamsForCreateAndUpdate,
} = require('../middlewares/expense.middlewares.js');

const router = express.Router();

router.get('/', validateReqParamsForGet, expenseController.get);
router.post('/', validateReqParamsForCreateAndUpdate, expenseController.create);
router.get('/:id', validateIdReqParam, expenseController.getOne);
router.delete('/:id', validateIdReqParam, expenseController.remove);

router.patch(
  '/:id',
  validateReqParamsForCreateAndUpdate,
  validateIdReqParam,
  expenseController.update,
);

module.exports = router;
