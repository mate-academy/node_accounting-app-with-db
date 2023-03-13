'use strict';

const User = require('../models/user');

const getAllUsers = async() => {
  const users = await User.findAll();

  return users;
};

const getUserById = (userId) => {
  return User.findByPk(userId);
};

const createUser = (name) => {
  return User.create({ name });
};

const removeUser = (userId) => {
  return User.destroy({
    where: { id: userId },
  });
};

const updateUser = (id, name) => {
  return User.update({ name }, {
    where: { id },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
