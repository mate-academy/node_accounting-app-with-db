'use strict';

const express = require('express');
const userController = require('./users.controller');

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.post('', userController.create);

router.delete('/:id', userController.remove);

router.patch('/:id', userController.update);

module.exports = {
  router,
};
