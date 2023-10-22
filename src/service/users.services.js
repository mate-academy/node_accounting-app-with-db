'use strict';

const User = require('../models/userModel');

const getAllUsers = () => {
  const result = User.findAll();

  return result;
};

const getUserById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = (name) => User.create({ name });

const updateUser = async(id, name) => {
  await User.update({ name }, { where: { id } });

  return getUserById(id);
};

const removeUser = async(id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
