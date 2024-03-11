'use strict';

const Router = require('express');

const userController = require('../controllers/user.controller');
const {
  idValidation, bodyValidation,
} = require('../middleware/validation.middleware');
const { userReqSchema } = require('../libs/validation.schemas/user.schemas');

const router = Router();

router.get('/', userController.get);

router.get(
  '/:id',
  idValidation,
  userController.getOne
);

router.delete(
  '/:id',
  idValidation,
  userController.remove
);

router.post(
  '/',
  bodyValidation(userReqSchema),
  userController.create
);

router.patch(
  '/:id',
  idValidation,
  bodyValidation(userReqSchema),
  userController.update
);

module.exports = router;
