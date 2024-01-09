'use strict';

const express = require('express');
const { userController } = require('../controllers/user.controller.js');

const router = express.Router();

router.get('/', userController.get);

router.get('/:id', userController.getOne);

router.post('/', userController.create);

router.delete('/:id', userController.remove);

router.patch('/:id', userController.update);

module.exports = {
  router,
};
