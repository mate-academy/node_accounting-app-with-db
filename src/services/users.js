'use strict';

const User = require('../models/User');

async function getAllUsers() {
  const user = await User.findAll();

  return user;
}

async function getUserById(userId) {
  const user = await User.findByPk(userId);

  return user;
}

async function createUser(name) {
  const user = await User.create({ name });

  return user;
}

function removeUser(userId) {
  const user = User.destroy({ where: { id: userId } });

  return user;
}

async function updateUser(userId, requestBody) {
  const data = await User.update(requestBody, { where: { id: userId } });

  return data;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
