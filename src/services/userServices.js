'use strict';

const { User } = require('../models/user');

function getUsers() {
  return User.findAll();
}

function getUserById(userId) {
  return User.findByPk(userId);
}

function createUser(name) {
  const newUser = User.create({ name });

  return newUser;
}

function updateUser(userId, name) {
  return User.update({ name }, {
    where: { id: userId },
  });
}

function deleteUser(userId) {
  return User.destroy({
    where: { id: userId },
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
