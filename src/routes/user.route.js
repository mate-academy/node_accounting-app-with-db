'use strict';

const express = require('express');
const userController = require('../controllers/user.controller.js');
const {
  validateIdReqParam,
  validateReqParamsForCreateAndUpdate,
} = require('../middlewares/user.middlewares.js');

const router = express.Router();

router.get('/', userController.getAll);
router.post('/', validateReqParamsForCreateAndUpdate, userController.create);
router.get('/:id', validateIdReqParam, userController.getOne);
router.delete('/:id', validateIdReqParam, userController.remove);

router.patch(
  '/:id',
  validateIdReqParam,
  validateReqParamsForCreateAndUpdate,
  userController.update,
);

module.exports = router;
