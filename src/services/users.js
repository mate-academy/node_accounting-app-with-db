'use strict';

const { User } = require('../models/User');

function normalize({ id, name }) {
  return {
    id, name,
  };
}

async function getAllUsers() {
  const users = await User.findAll();

  return users;
};

async function getUserById(userId) {
  const foundUser = await User.findByPk(Number(userId));

  return foundUser;
};

async function createUser(name) {
  const newUser = await User.create({ name });

  return newUser;
};

function removeUser(userId) {
  return User.destroy({
    where: {
      id: Number(userId),
    },
  });
};

async function updateUser(userId, name) {
  const updatedUser = await User.update({ name }, {
    where: {
      id: Number(userId),
    },
  });

  return updatedUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  normalize,
};
