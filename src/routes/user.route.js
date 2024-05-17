const express = require('express');
const expressValidator = require('express-validator');
const userController = require('../controllers/user.controller');
const schemas = require('../controllers/user.schema');

const router = express.Router();

router.get('/', userController.getAll);

router.get(
  '/:id',
  expressValidator.checkSchema(schemas.getOne, ['params']),
  userController.getOne,
);

router.post(
  '/',
  expressValidator.checkSchema(schemas.create, ['body']),
  userController.create,
);

router.patch(
  '/:id',
  expressValidator.checkSchema(schemas.update, ['params', 'body']),
  userController.update,
);

router.delete(
  '/:id',
  expressValidator.checkSchema(schemas.remove, ['params']),
  userController.remove,
);

module.exports = router;
