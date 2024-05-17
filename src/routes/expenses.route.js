const express = require('express');
const expressValidator = require('express-validator');
const expensesController = require('../controllers/expenses.controller');
const schemas = require('../controllers/expenses.schema');

const router = express.Router();

router.get(
  '/',
  expressValidator.checkSchema(schemas.getAll, ['query']),
  expensesController.getAll,
);

router.get(
  '/:id',
  expressValidator.checkSchema(schemas.getOne, ['params']),
  expensesController.getOne,
);

router.post(
  '/',
  expressValidator.checkSchema(schemas.create, ['body']),
  expensesController.create,
);

router.patch(
  '/:id',
  expressValidator.checkSchema(schemas.update, ['body', 'params']),
  expensesController.update,
);

router.delete(
  '/:id',
  expressValidator.checkSchema(schemas.remove, ['params']),
  expensesController.remove,
);

module.exports = router;
