'use strict';

const { User } = require('../models/user');

function getAllUsers() {
  return User.findAll({
    order: ['created_at'],
  });
};

function addUser(name) {
  const newUser = User.create({ name });

  return newUser;
};

function getUser(id) {
  return User.findByPk(id);
}

function deleteUser(id) {
  User.destroy({
    where: {
      id: id,
    },
  });

  return true;
}

function updateUser(id, name) {
  const newUser = User.update({
    name,
  }, {
    where: { id }, returning: true,
  });

  return newUser;
};

function normalize({ id, name }) {
  return {
    id, name,
  };
};

module.exports = {
  getAllUsers, addUser, getUser, deleteUser, updateUser, normalize,
};
