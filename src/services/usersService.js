'use strict';

const { User } = require('../models/userModel');

async function resetUsers() {
  await User.destroy({
    truncate: true,
  });
}

async function getAllUsers() {
  return User.findAll();
}

async function getUserById(id) {
  return User.findOne({
    where: {
      id: id,
    },
  });
}

async function createUser(data) {
  return User.create(data);
}

async function deleteUser(userId) {
  await User.destroy({
    where: {
      id: userId,
    },
  });
}

async function updateUser(data) {
  const { id, ...restData } = data;

  await User.update(restData, {
    where: {
      id: id,
    },
  });

  return data;
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUser,
  resetUsers,
};
