'use strict';

const { User } = require('../models/user');

const getAllUsers = () => {
  return User.findAll();
};

const getUserById = (userId) => {
  return User.findByPk(userId);
};

const createUser = (name) => {
  const user = User.create({ name });

  return user;
};

const updateUser = (userId, name) => {
  return User.update({ name }, {
    where: { id: userId },
  });
};

const removeUser = (userId) => {
  return User.destroy({
    where: { id: userId },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
