'use strict';

const { Router } = require('express');
const usersController = require('../controllers/usersController');

const router = Router();

router.get('/', usersController.get);

router.get('/:id', usersController.getUserById);

router.post('/', usersController.create);

router.delete('/:id', usersController.remove);

router.patch('/:id', usersController.update);

module.exports = {
  usersRouter: router,
};
