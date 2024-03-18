/* eslint-disable no-console */
'use strict';

const express = require('express');
const usersController = require('../controlles/user.controller');

const router = express.Router();

router.post('/', usersController.create);

router.get('/', usersController.get);

router.get('/:id', usersController.getOne);

router.patch('/:id', usersController.update);

router.delete('/:id', usersController.remove);

module.exports = {
  router,
};
