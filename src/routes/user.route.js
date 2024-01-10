'use strict';

const express = require('express');
const { userController } = require('../controllers/user.controller.js');
const { catchError } = require('../utils/catchError.js');

const router = express.Router();

router.get('/', catchError(userController.get));

router.get('/:id', catchError(userController.getOne));

router.post('/', catchError(userController.create));

router.delete('/:id', catchError(userController.remove));

router.patch('/:id', catchError(userController.update));

module.exports = {
  router,
};
