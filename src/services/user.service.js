'use strict';

const User = require('../models/user');

const userService = {
  getAll: () => {
    return User.findAll();
  },
  getById: (id) => {
    return User.findByPk(id);
  },
  addUser: (newUser) => {
    return User.create({
      ...newUser,
    });
  },
  removeUser: (id) => {
    return User.destroy({
      where: {
        id,
      },
    });
  },
  updateUser: (newUserData, id) => {
    return User.update({ ...newUserData }, { where: { id } });
  },
};

module.exports = {
  userService,
};
