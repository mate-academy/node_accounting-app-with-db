'use strict';

const { User } = require('../models/users');

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

function getAllUsers() {
  return User.findAll({
    order: ['createdAt'],
  });
};

function getUserById(id) {
  return User.findByPk(id);
}

function createUser(name) {
  return User.create({ name });
}

function removeUser(id) {
  return User.destroy({
    where: { id },
  });
}

function updateUser(id, name) {
  return User.update({ name }, {
    where: { id },
  });
}

module.exports = {
  normalize,
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
