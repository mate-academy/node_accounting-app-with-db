'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');
const Router = express.Router();

Router.get('/', userController.getAll);

Router.get('/:userId', userController.findById);

Router.post('/', userController.createNewUser);

Router.delete('/:userId', userController.deleteUserById);

Router.patch('/:userId', userController.handleUserUpdate);

module.exports = {
  Router,
};
