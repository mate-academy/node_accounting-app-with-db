'use strict';

const Router = require('express');

const expenseController = require('../controllers/expense.controller');

const {
  idValidation, bodyValidation, queryValidation,
} = require('../middleware/validation.middleware');

const {
  expensePostSchema, expensePatchSchema, expenseQuerySchema,
} = require('../libs/validation.schemas/expense.schemas');

const router = Router();

router.get(
  '/',
  queryValidation(expenseQuerySchema),
  expenseController.get
);

router.get(
  '/:id',
  idValidation,
  expenseController.getOne
);

router.delete(
  '/:id',
  idValidation,
  expenseController.remove
);

router.post(
  '/',
  bodyValidation(expensePostSchema),
  expenseController.create
);

router.patch(
  '/:id',
  idValidation,
  bodyValidation(expensePatchSchema),
  expenseController.update
);

module.exports = router;
