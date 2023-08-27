'use strict';

const { User } = require('../models/user.model');

async function getAll() {
  const result = await User.findAll({
    order: ['id'],
  });

  return result;
}

function getUserById(id) {
  return User.findByPk(id);
}

function createUser(name) {
  return User.create({ name });
}

async function updateUser(id, editedName) {
  await User.update({ name: editedName }, {
    where: {
      id,
    },
  });

  return getUserById(id);
}

function removeUser(id) {
  return User.destroy({
    where: { id },
  });
}

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
