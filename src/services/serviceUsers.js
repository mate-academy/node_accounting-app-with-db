'use strict';

const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = async (name) => {
  const user = await User.create({ name });

  return user;
};

const updateUser = async (id, name) => {
  const user = await getUserById(id);

  if (!user) {
    return null;
  }

  await user.update({ name });

  return user;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);

  if (!user) {
    return false;
  }

  await user.destroy();

  return true;
};

const clearUsers = async () => {
  await User.destroy({
    where: {},
    truncate: true,
    restartIdentity: true,
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  clearUsers,
};
