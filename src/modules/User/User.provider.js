'use strict';

const User = require('./User.model');
const UserService = require('./User.service');
const UserController = require('./User.controller');

class UserProvider {
  constructor() {
    this.service = new UserService(User);
    this.controller = new UserController(this.service);
  }
}

module.exports = UserProvider;
