'use strict';

const User = require('./User.model');
const UserService = require('./User.service');
const UserController = require('./User.controller');

const userService = new UserService(User);
const userController = new UserController(userService);

module.exports = userController;
