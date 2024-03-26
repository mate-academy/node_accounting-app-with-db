'use strict';

const { User } = require('../models/User.model');

async function getAllUsers() {
  const result = await User.findAll();

  return result;
}

async function getUserById(id) {
  return User.findByPk(+id);
}

async function createUser(name) {
  return User.create(name);
}

async function updateUser({ id, name }) {
  await User.update({ name }, { where: { id } });
}

async function deleteUser(id) {
  await User.destroy({ where: { id } });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
