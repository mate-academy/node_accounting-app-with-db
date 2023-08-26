'use strict';

const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:userId', usersController.getUser);
router.post('/', usersController.createUser);
router.patch('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);

module.exports = {
  usersRouter: router,
};
