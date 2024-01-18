'use strict';

const { User } = require('../models/User');

function getAllUsers() {
  const result = User.findAll();

  return result;
}

async function getUserById(id) {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (error) {
    return error;
  }
};

async function createUser(name) {
  const newUser = await User.create({
    name,
  });

  return newUser;
}

async function updateUser(id, name) {
  await User.update({ name }, {
    where: {
      id,
    },
  });

  return getUserById(id);
}

async function removeUser(id) {
  try {
    await User.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    return error;
  };
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
