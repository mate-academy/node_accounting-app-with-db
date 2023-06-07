'use strict';

const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getAll);
router.post('/', userController.addUser);
router.get('/:userId', userController.getOne);
router.delete('/:userId', userController.removeUser);
router.patch('/:userId', userController.updateUser);

module.exports = {
  userRouter: router,
};
