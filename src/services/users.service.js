'use strict';

const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const user = await User.findAll();

  return user;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = async (name) => {
  const user = await User.create({ name });

  return user;
};

const updateUser = async (id, newName) => {
  await User.update({ name: newName }, { where: { id } });

  return User.findByPk(id);
};

const removeUser = async (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
