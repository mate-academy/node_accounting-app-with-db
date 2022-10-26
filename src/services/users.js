'use strict';

const { User } = require('../models/User');
const generateUniqueId = require('generate-unique-id');

function normalize({ id, name }) {
  return {
    id, name,
  };
}

function getAll() {
  return User.findAll({
    order: ['created_at'],
  });
};

function getUserById(userId) {
  return User.findByPk(userId);
}

function createUser(name) {
  const id = Number(generateUniqueId({
    length: 8,
    useLetters: false,
  }));

  return User.create({
    id, name,
  });
}

function removeUser(userId) {
  return User.destroy({
    where: { id: userId },
  });
};

function updateUser({ id, name }) {
  return User.update({ name }, {
    where: { id },
  });
};

module.exports = {
  getUserById,
  createUser,
  removeUser,
  updateUser,
  getAll,
  normalize,
};
