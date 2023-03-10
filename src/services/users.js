'use strict';

const Users = require('../db/models/users');

function normalizeUser({ id, name }) {
  return {
    id, name,
  };
}

function getAll() {
  return Users.findAll();
}

function getUserById(userId) {
  return Users.findByPk(+userId);
}

function createNewUser(name) {
  if (typeof name !== 'string') {
    throw new Error('The name must be a string');
  }

  return Users.create({ name });
}

function deleteUser(userId) {
  return Users.destroy({
    where: {
      id: +userId,
    },
  });
}

function updateUserInfo({ id, name }) {
  return Users.destroy({ name }, {
    where: {
      id,
    },
  });
}

module.exports = {
  normalizeUser,
  getAll,
  getUserById,
  createNewUser,
  deleteUser,
  updateUserInfo,
};
